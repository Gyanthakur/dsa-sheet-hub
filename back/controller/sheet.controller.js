import sheetSchema from '../model/sheet.model.js';
import questionSchema from '../model/question.model.js';
import starredSchema from '../model/starred.model.js';
export async function createSheet(req, res) {
    try {
        const { name, title, isPublic, description } = req.body;
        if (!name || !title || isPublic === undefined)
            return res.status(400).json({ error: 'Missing Essential fields' });
        const newSheet = new sheetSchema({
            name: name,
            title: title,
            isPublic: isPublic,
            addedBy: req.user._id,
            description: req.body.description || ''
        });
        const savedSheet = await newSheet.save();
        if (!savedSheet)
            return res.status(400).json({ error: 'Sheet not created' });
        res.status(200).json({ mesaage: "Sheet created successfully", sheet: savedSheet });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getSheet(req, res) {
    try {
        const sheet = await sheetSchema.findOne({ title: req.params.id, isPublic: true }).populate({ path: "addedBy", select: "username name -_id" }).populate({ path: "questions", select: "-__v -createdAt -updatedAt _id" }).select("-updatedAt -__v ")
        if (!sheet)
            return res.status(404).json({ error: 'Sheet not found' });
        res.status(200).json({ sheet });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getSheets(req, res) {
    try {
        const sheets = await sheetSchema.find({ isPublic: true }).populate({ path: "addedBy", select: "username name -_id" }).select("-updatedAt -__v ")
        res.status(200).json({ sheets });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function deleteSheet(req, res) {
    try {
        const sheet = await sheetSchema.findOne({ _id: req.params.id });
        if (!sheet)
            return res.status(400).json({ error: 'Sheet not found' });
        if (sheet.addedBy != req.user._id)
            return res.status(401).json({ error: 'You are not authorized to delete this sheet' })
        const deletedSheet = await sheetSchema.deleteOne({ _id: req.params.id });
        if (!deletedSheet)
            return res.status(400).json({ error: 'Sheet not deleted' });
        res.status(200).json({ mesaage: "Sheet deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function addQuestionToSheet(req, res) {
    try {
        const { sheetId, questionId } = req.body;
        if (!sheetId || !questionId)
            return res.status(400).json({ error: 'Missing Essential fields' });
        const sheet = await sheetSchema.findOne({ _id: sheetId });
        if (!sheet)
            return res.status(400).json({ error: 'Sheet not found' });
        if (sheet.questions.includes(questionId))
            return res.status(400).json({ error: 'Question already added to the sheet' });
        if (sheet.addedBy != req.user._id)
            return res.status(401).json({ error: 'You are not authorized to add questions to this sheet' })
        const question = await questionSchema.findOne({ _id: questionId });
        if (!question)
            return res.status(400).json({ error: 'Question not found' });
        sheet.questions.push(questionId);
        const savedSheet = await sheet.save();
        if (!savedSheet)
            return res.status(400).json({ error: 'Sheet not updated' });
        res.status(200).json({ mesaage: "Sheet updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function removeQuestionFromSheet(req, res) {
    try {
        const { sheetId, questionId } = req.body;
        if (!sheetId || !questionId)
            return res.status(400).json({ error: 'Missing Essential fields' });
        const sheet = await sheetSchema.findOne({ _id: sheetId });
        if (!sheet)
            return res.status(400).json({ error: 'Sheet not found' });
        if (sheet.addedBy != req.user._id)
            return res.status(401).json({ error: 'You are not authorized to remove questions from this sheet' })
        const question = await questionSchema.findOne({ _id: questionId });
        if (!question)
            return res.status(400).json({ error: 'Question not found' });
        sheet.questions = sheet.questions.filter((q) => q != questionId);
        const savedSheet = await sheet.save();
        if (!savedSheet)
            return res.status(400).json({ error: 'Failed to update sheet' });
        res.status(200).json({ mesaage: "Sheet updated successfully", sheet: savedSheet });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getTrendingSheets(req, res) {
    try {
        const topSheets = await starredSchema.aggregate([
            { $group: { _id: "$sheetId", stars: { $sum: 1 } } },
            { $sort: { stars: -1 } },
            { $limit: 3 }
        ]);
        const sheetIds = topSheets.map(sheet => sheet._id);

        const sheets = await sheetSchema.find({ _id: { $in: sheetIds } }).populate({ path: "addedBy", select: "username" }).select('name title isPublic addedBy description questions');
        const sheetsWithStarCount = sheets.map(sheet => {
            const starCount = topSheets.find(topSheet => topSheet._id.toString() === sheet._id.toString()).stars;
            return { ...sheet._doc, starCount };
        });
        res.status(200).json({ sheets: sheetsWithStarCount });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getUserSheets(req, res) {
    try {
        const sheets = await sheetSchema.find({ addedBy: req.user._id }).populate({ path: "addedBy", select: "username name " }).select('-__v ');
        res.status(200).json({ sheets });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
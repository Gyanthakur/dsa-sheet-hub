import starredSchema from "../model/starred.model.js";
import sheetSchema from "../model/sheet.model.js";


export async function starSheet(req, res) {
    try {
        const { sheetId } = req.body;
        // Check if the sheet note exists
        const sheet = await sheetSchema.findById(sheetId);
        if (!sheet) {
            return res.status(404).json({ message: 'Sheet note not found' });
        }
        // Check if the star already exists for the user and sheet note
        const existingStar = await starredSchema.findOne({ userId: req.user._id, sheetId });
        if (existingStar) {
            return res.status(200).json({ message: 'Already Starred' });
        }
        const newStar = new starredSchema({ userId: req.user._id, sheetId });
        const starredsheet = await newStar.save();
        // Update starCount in sheet model
        if (!starredsheet)
            return res.status(500).json({ message: 'Error Starring' });
        sheet.starCount += 1;
        await sheet.save();
        res.status(201).json({ message: 'Starred' });
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};

export async function unstarSheet(req, res) {
    try {
        const { sheetId } = req.body;
        const sheet = await sheetSchema.findById(sheetId);
        const existingStar = await starredSchema.findOne({ userId: req.user._id, sheetId });
        if (!existingStar) {
            return res.status(404).json({ message: 'Not Starred' });
        }
        if (existingStar.userId != req.user._id)
            return res.status(401).json({ error: "Unauthorized" })
        const removedStar = await starredSchema.findByIdAndDelete(existingStar._id);
        if (!removedStar) {
            return res.status(500).json({ message: 'Error unstarring' });
        }
        sheet.starCount -= 1;
        await sheet.save();
        res.status(200).json({ message: 'Unstarred' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function starCount(req, res) {
    try {
        const count = await starredSchema.countDocuments({ sheetId: req.params.id });
        res.status(200).json({ count });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function isStarred(req, res) {
    try {
        const existingStar = await starredSchema.findOne({ userId: req.user._id, sheetId: req.params.id });
        if (!existingStar) {
            return res.status(200).json({ message: 'Not Starred', starred: false });
        }
        res.status(200).json({ message: 'Starred', starred: true });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

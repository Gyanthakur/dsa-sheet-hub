import sheetSchema from '../model/sheet.model.js';
import questionSchema from '../model/question.model.js';
// import starredSchema from '../model/starred.model.js';
export async function getSheetManagamentData(req, res) {
    try {
        const sheet = await sheetSchema.findOne({ addedBy: req.user._id, title: req.params.title })
            .populate({ path: "addedBy", select: "name username" }).select("-__v ");
        if (sheet == null)
            return res.status(404).json({ status: 404, message: "Sheet not found" })
        const questions = await questionSchema.find({ addedBy: req.user._id }).select("-__v ");

        const data = {
            sheet: sheet,
            questions: questions,
            selected: sheet.questions,
        }
        res.status(200).json({ status: 200, data: data });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
}
import questionSchema from "../model/question.model.js"
export default async function createQuestion(req, res) {
    try {
        if (!req.body.name || !req.body.url1)
            return res.status(400).json({ error: "Missing Important Fields" })
        const question = new questionSchema({ ...req.body, title: `${req.user._id}-${req.body.name.split(" ").join("-")}`, addedBy: req.user._id });
        const savedQuestion = await question.save();
        if (!savedQuestion)
            return res.status(500).json({ error: "Failed to create Question" })
        res.status(200).json({ message: 'Question added successfully', question: savedQuestion });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

export async function deleteQuestion(req, res) {
    try {
        const { questionId } = req.params;
        const question = await questionSchema.findOne({ _id: req.params.id })
        if (!question)
            return res.status(404).json({ error: "Question not found" });
        if (question.addedBy != req.user._id)
            return res.status(401).json({ error: "You are not authorized to delete this question" })
        const deletedQuestion = await questionSchema.findByIdAndDelete(req.params.id);
        if (!deletedQuestion)
            return res.status(401).json({ error: "Failed to Delete" });
        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

export async function getQuestions(req, res) {
    try {
        const questions = await questionSchema.find();
        if (!questions)
            return res.status(404).json({ error: "No Questions Found" });
        res.status(200).json({ questions });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}
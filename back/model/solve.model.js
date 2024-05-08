// id
// userId
// sheetId
// questionId
import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sheetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sheet',
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }
});

export default mongoose.model('Response', responseSchema);
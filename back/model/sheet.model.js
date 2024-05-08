// name 
// id 
// sheet 
// addedBy -> user
// starCount
// questionCount
// questions question[]
// title


import mongoose from 'mongoose';


const sheetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    title:{
        type: String,
        required: true,
        unique: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    starCount: {
        type: Number,
        default: 0
    },
    questionCount: {
        type: Number,
        default: 0
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        default: []
    }]
});

// Exporting the model
export default mongoose.model('Sheet', sheetSchema);

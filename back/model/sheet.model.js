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
    title: {
        type: String,
        required: true,
        unique: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        default: []
    }]
}, { timestamps: true });

// Exporting the model
export default mongoose.model('Sheet', sheetSchema);

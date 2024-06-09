// name 
// id 
// sheet 
// addedBy -> user
// starCount
// questionCount
// questions question[]
// title


import mongoose from 'mongoose';
import { type } from 'os';


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
    description: {
        type: String,
        default: ''
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        default: []
    }],
    starCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Exporting the model
export default mongoose.model('Sheet', sheetSchema);

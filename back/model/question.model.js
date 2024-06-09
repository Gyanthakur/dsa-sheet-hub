// name -> required
// id -> required
// link -> required
// tags []
// difficulty -> required
// title -> required


// Importing required modules
import mongoose from 'mongoose';

// Define schema structure
const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    url1: {
        type: String,
        required: true
    },
    url2: {
        type: String,
        default: ""
    },
    tags: [{
        type: String
    }],
    difficulty: {
        type: String,
        default: "easy"
    },
    title: {
        type: String,
        unique: true,
        required: true,
    }
}, {
    timestamps: true
});

// Exporting the model
export default mongoose.model('Question', problemSchema);

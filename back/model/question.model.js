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
    id: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    difficulty: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

// Exporting the model
export default mongoose.model('Problem', problemSchema);

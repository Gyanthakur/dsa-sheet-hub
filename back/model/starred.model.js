// id
// userId
// sheetId

import mongoose from 'mongoose';
const starredSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sheetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sheet',
        required: true
    }
},
    {
        timestamps: true
    });

export default mongoose.model('Starred', starredSchema);
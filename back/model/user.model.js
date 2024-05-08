import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLenght: 6,
            maxLenght: 20,
        },
        profile: {
            type: String,
            default: "",
        },
        verificationStatus: {
            type: Boolean,
            default: true,
        },
        admin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);


export default mongoose.model("User", UserSchema);

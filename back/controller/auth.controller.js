import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
export async function Register(req, res) {
    try {
        const { name, email, username, password } = req.body;
        const user = await userModel.findOne({ $or: [{ email: email }, { username: username }] });
        if (user)
            return res
                .status(401)
                .json({ status: 401, message: "user already exists" });
        else {
            const url = `https://api.genderize.io?name=${name}`;
            const response = await fetch(url);
            const data = await response.json();
            const gender = data.gender;
            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
            const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
            const newuser = new userModel({
                name: name,
                email: email,
                username: username,
                password: CryptoJS.AES.encrypt(
                    password,
                    process.env.CRYPTOJS_SEC_KEY
                ).toString(),
                avatar: res.gender === "female" ? girlProfilePic : boyProfilePic
            });
            const result = await newuser.save();
            if (result)
                return res
                    .status(201)
                    .json({ status: 201, token: tokengenerator(result._id), user: result });
            else
                return res
                    .status(500)
                    .json({ status: 500, message: "Error registering user" });
        }
    } catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    }
}
export async function Login(req, res) {
    try {
        const { cred, password } = req.body;
        const user = await userModel.findOne({ $or: [{ email: cred }, { username: cred }] });
        if (!user)
            return res
                .status(401)
                .json({ status: 401, message: "Email or password is incorrect" });
        else {
            const bytes = CryptoJS.AES.decrypt(
                user.password,
                process.env.CRYPTOJS_SEC_KEY
            );
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
            if (originalPassword !== password)
                return res
                    .status(401)
                    .json({ status: 401, message: "Email or password is incorrect" });
            else
                return res
                    .status(200)
                    .json({ status: 200, token: tokengenerator(user._id), user: user });
        }
    } catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    }
}

export async function DeleteUser(req, res) {
    try {
        const user = await userModel.findByIdAndDelete(req.user._id);
        if (user) {
            return res
                .status(200)
                .json({ status: 200, message: "User deleted successfully" });
            // TODO
            // Add code to delete all the details of the user    
        }
        else
            return res
                .status(404)
                .json({ status: 404, message: "User not found" });
    } catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    }
}

export async function UpdatePassword(req, res) {
    try {
        const { currentPassword, newPassword } = req.body;
        if (newPassword.length < 6) return res.status(400).json({ status: 400, message: "Password must be atleast 6 characters long" });
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.CRYPTOJS_SEC_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (originalPassword !== currentPassword) {
            return res.status(401).json({ status: 401, message: "Current password is incorrect" });
        }
        if (newPassword == currentPassword) return res.status(400).json({ status: 400, message: `New password can't be same as current password` })
        user.password = CryptoJS.AES.encrypt(newPassword, process.env.CRYPTOJS_SEC_KEY).toString();
        const result = await user.save();
        if (result) {
            return res.status(200).json({ status: 200, message: "Password updated successfully" });
        } else {
            return res.status(500).json({ status: 500, message: "Error updating password" });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    }
}

export async function UserSession(req, res) {
    try {
        const user = await userModel.findById(req.user._id).select("-password -updatedAt -__v -_id");
        if (user)
            return res.status(200).json({ status: 200, user: user });
        else
            return res.status(404).json({ status: 404, message: "User not found" });
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    }
}
const tokengenerator = (_id) => {
    return jwt.sign({ _id: _id }, process.env.JWT_SEC_KEY, { expiresIn: "10d" });
};



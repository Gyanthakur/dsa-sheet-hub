import express from "express";
const router = express.Router();
import { Register, Login, DeleteUser, UpdatePassword } from "../../controller/auth.controller.js";
import { verifyToken } from "../../middleware/verifyToken.middleware.js";
router.post("/signup", Register);
router.post("/signin", Login);
router.delete("/deleteuser", verifyToken, DeleteUser);
router.put("/updatepassword", verifyToken, UpdatePassword);
export default router;

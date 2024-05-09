/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '401':
 *         description: User already exists
 */
/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Email or password is incorrect
 */
/**
 * @swagger
 * /api/auth/deleteuser:
 *   delete:
 *     summary: Delete a user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 */
/**
 * @swagger
 * /api/auth/updatepassword:
 *   put:
 *     summary: Update user's password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password updated successfully
 *       '400':
 *         description: Current password is incorrect or new password is same as current password
 *       '401':
 *         description: Unauthorized
 */
import express from "express";
const router = express.Router();
import { Register, Login, DeleteUser, UpdatePassword } from "../../controller/auth.controller.js";
import { verifyToken } from "../../middleware/verifyToken.middleware.js";
router.post("/signup", Register);
router.post("/signin", Login);
router.delete("/deleteuser", verifyToken, DeleteUser);
router.put("/updatepassword", verifyToken, UpdatePassword);
export default router;

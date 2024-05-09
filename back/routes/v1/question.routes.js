/**
 * @swagger
 * /api/questions/create:
 *   post:
 *     summary: Create a new question
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               url1:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Question added successfully
 *       '400':
 *         description: Missing important fields
 *       '500':
 *         description: Failed to create question
 */
/**
 * @swagger
 * /api/questions/delete/{questionId}:
 *   delete:
 *     summary: Delete a question
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Question deleted successfully
 *       '401':
 *         description: You are not authorized to delete this question or Failed to Delete
 *       '404':
 *         description: Question not found
 */

/**
 * @swagger
 * /api/questions/getquestions:
 *   get:
 *     summary: Get all questions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of questions
 *       '404':
 *         description: No questions found
 */

import express from 'express';
import { verifyToken } from '../../middleware/verifyToken.middleware.js';
import createQuestion, { deleteQuestion, getQuestions } from '../../controller/question.controller.js';
const router = express.Router();

router.post('/create', verifyToken, createQuestion)
router.delete("/delete/:id", verifyToken, deleteQuestion)
router.get("/getquestions", verifyToken, getQuestions)
export default router;
/**
 * @swagger
 * /api/sheets/create:
 *   post:
 *     summary: Create a new sheet
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
 *               title:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Sheet created successfully
 *       '400':
 *         description: Missing essential fields or Sheet not created
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/sheets/getsheet/{id}:
 *   get:
 *     summary: Get a sheet by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sheet found
 *       '400':
 *         description: Sheet not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/sheets/getsheets:
 *   get:
 *     summary: Get all public sheets
 *     responses:
 *       '200':
 *         description: List of sheets
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/sheets/delete/{id}:
 *   delete:
 *     summary: Delete a sheet
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sheet deleted successfully
 *       '400':
 *         description: Sheet not found or Sheet not deleted
 *       '401':
 *         description: You are not authorized to delete this sheet
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/sheets/addquestion:
 *   put:
 *     summary: Add a question to a sheet
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sheetId:
 *                 type: string
 *               questionId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Sheet updated successfully
 *       '400':
 *         description: Missing essential fields or Question already added to the sheet
 *       '401':
 *         description: You are not authorized to add questions to this sheet
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/sheets/removequestion:
 *   put:
 *     summary: Remove a question from a sheet
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sheetId:
 *                 type: string
 *               questionId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Sheet updated successfully
 *       '400':
 *         description: Missing essential fields or Question not found
 *       '401':
 *         description: You are not authorized to remove questions from this sheet
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/sheets/trendingsheets:
 *   get:
 *     summary: Get top sheets based on the number of stars
 *     responses:
 *       '200':
 *         description: Top sheets retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sheets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Sheet'
 *       '500':
 *         description: Internal server error
 */

import express from 'express';
const router = express.Router();
import { addQuestionToSheet, createSheet, deleteSheet, getSheet, getSheets, getTrendingSheets, getUserSheets, removeQuestionFromSheet } from '../../controller/sheet.controller.js';
import { verifyToken } from '../../middleware/verifyToken.middleware.js';

router.post("/create", verifyToken, createSheet)
router.get("/getsheet/:id", getSheet)
router.get("/getsheets", getSheets)
router.delete("/delete/:id", verifyToken, deleteSheet)
router.put("/addquestion", verifyToken, addQuestionToSheet)
router.put("/removequestion", verifyToken, removeQuestionFromSheet)
router.get("/trendingsheets", getTrendingSheets)
router.get("/getusersheets", verifyToken, getUserSheets)
export default router;



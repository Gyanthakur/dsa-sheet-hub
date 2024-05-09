/**
 * @swagger
 * /api/starred/star:
 *   post:
 *     summary: Star a sheet
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
 *     responses:
 *       '200':
 *         description: Sheet starred successfully
 *       '404':
 *         description: Sheet note not found
 *       '500':
 *         description: Error starring sheet
 */
/**
 * @swagger
 * /api/starred/unstar:
 *   delete:
 *     summary: Unstar a sheet
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
 *     responses:
 *       '200':
 *         description: Sheet unstarred successfully
 *       '404':
 *         description: Not starred
 *       '500':
 *         description: Error unstarring sheet
 */
/**
 * @swagger
 * /api/starred/starred-status/{id}:
 *   get:
 *     summary: Check if a sheet is starred
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sheet starred status retrieved successfully
 *       '500':
 *         description: Error retrieving starred status
 */
/**
 * @swagger
 * /api/starred/starcount/{id}:
 *   get:
 *     summary: Get the count of stars for a sheet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Count of stars retrieved successfully
 *       '500':
 *         description: Error retrieving count of stars
 */

import express from 'express';
import { isStarred, starCount, starSheet, unstarSheet } from '../../controller/starred.controller.js';
import { verifyToken } from '../../middleware/verifyToken.middleware.js';
const router = express.Router();

router.post('/star', verifyToken, starSheet);
router.delete('/unstar', verifyToken, unstarSheet);
router.get('/starred-status/:id', verifyToken, isStarred);
router.get('/starcount/:id', starCount);
export default router;
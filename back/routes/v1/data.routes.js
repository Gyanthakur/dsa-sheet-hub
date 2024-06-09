
import express from "express";
const router = express.Router();

import { verifyToken } from "../../middleware/verifyToken.middleware.js";
import { getSheetManagamentData } from "../../controller/data.controller.js";
router.get("/getsheetmanagamentdata/:title", verifyToken, getSheetManagamentData);
export default router;

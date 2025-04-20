import express from "express";
import * as fileController from "../controllers/fileController";

const router = express.Router();

router.post("/sync", fileController.syncFileStructure);

export default router;

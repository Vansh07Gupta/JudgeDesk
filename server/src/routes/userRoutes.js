import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.post("/join", userController.joinRequest);
router.get("/disconnecting", userController.disconnecting);

export default router;

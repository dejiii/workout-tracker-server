import express from "express";
import { signup, signin, getMe } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", protect, getMe);

export default router;

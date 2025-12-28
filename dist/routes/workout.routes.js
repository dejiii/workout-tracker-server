"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workout_controller_1 = require("../controllers/workout.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, workout_controller_1.createWorkout);
router.put("/:id", auth_middleware_1.protect, workout_controller_1.updateWorkout);
exports.default = router;

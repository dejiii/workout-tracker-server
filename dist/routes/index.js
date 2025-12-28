"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const workout_routes_1 = __importDefault(require("./workout.routes"));
const router = express_1.default.Router();
router.use("/users", user_routes_1.default);
router.use("/auth", auth_routes_1.default);
router.use("/workouts", workout_routes_1.default);
exports.default = router;

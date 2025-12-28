"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            res.status(400).json({ message: "Please fill all the fields" });
            return;
        }
        const userExists = await user_model_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const user = await user_model_1.default.create({ name, email, password });
        const token = generateToken(user._id);
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    }
    catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await user_model_1.default.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = generateToken(user._id);
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    }
    catch (err) {
        console.error("Signup error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};
exports.signin = signin;
const getMe = async (req, res) => {
    const user = req.user?.toObject ? req.user.toObject() : req.user;
    res.status(200).json({
        ...user,
    });
};
exports.getMe = getMe;

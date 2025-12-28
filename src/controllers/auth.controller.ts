import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import userModel from "../models/user.model";
import { Types } from "mongoose";

const generateToken = (id: Types.ObjectId | string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill all the fields" });
      return;
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await userModel.create({ name, email, password });
    const token = generateToken(user._id as Types.ObjectId);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err: any) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = generateToken(user._id as Types.ObjectId);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err: any) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req: any, res: Response) => {
  const user = req.user?.toObject ? req.user.toObject() : req.user;

  res.status(200).json({
    ...user,
  });
};

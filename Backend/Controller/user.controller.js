import User from "../models/user.model.js";
import { errorHandler } from "../utilities.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Allowed roles for signup validation
const allowedRoles = ["student", "faculty"];

export const signup = async (req, res, next) => {
  const { username, email, password, role = "user" } = req.body;

  // Basic validations
  if (!username) return next(errorHandler(400, "Username is required"));
  if (!email) return next(errorHandler(400, "Email is required"));
  if (!password) return next(errorHandler(400, "Password is required"));
  if (!allowedRoles.includes(role)) return next(errorHandler(400, "Invalid role"));

  const isValidUser = await User.findOne({ email });
  if (isValidUser) return next(errorHandler(400, "User already exists"));

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role, // <- include role here
  });

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

   res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "Login successful!",
      rest,
    });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

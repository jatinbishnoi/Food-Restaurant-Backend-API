import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// REGISTER CONTROLLER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;

    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Email already registered, please login",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });

    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error("Error in Register API:", error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error: error.message,
    });
  }
};

// LOGIN CONTROLLER
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found, please register",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Error in Login API:", error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error: error.message,
    });
  }
};

export { registerController, loginController };

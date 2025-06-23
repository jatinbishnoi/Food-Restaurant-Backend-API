import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';

// GET USER INFO CONTROLLER
const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.user.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "User info fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting user info",
      error: error.message,
    });
  }
};

// UPDATE USER CONTROLLER
const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.user.id });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const { userName, address, phone } = req.body;

    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in updating user",
      error: error.message,
    });
  }
};

// UPDATE USER PASSWORD CONTROLLER
const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.user.id });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide old and new password",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    user.password = hashedPassword;

    await user.save();

    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in updating password",
      error: error.message,
    });
  }
};

// RESET PASSWORD CONTROLLER
const resetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email || !answer || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide email, answer and new password",
      });
    }

    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found or answer is incorrect",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    user.password = hashedPassword;

    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in resetting password",
      error: error.message,
    });
  }
};

// DELETE USER CONTROLLER
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete({ _id: req.params.id });

    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in deleting user",
      error: error.message,
    });
  }
};

export {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};

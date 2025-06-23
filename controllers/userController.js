import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
// GET USER INFO CONTROLLER
const getUserController = async (req, res) => {
   try{
    // Check if user is authenticated
        const user = await User.findById({_id:req.user.id});
        // If user not found, return error
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        //Hide password 
        user.password = undefined;
        // Return user info
        res.status(200).send({
            success: true,
            message: "User info fetched successfully",
            user,
        });
   }
   catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting user info",
      error: error.message,
    });
   }
}

// UPDATE USER CONTROLLER
const updateUserController = async (req, res) => {
    try {
        //find user by id
        const user = await User.findById({_id: req.user.id});
        // If user not found, return error (Validation)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        // Update user info
        const { userName, address, phone } = req.body;
        if (userName) {
            user.userName = userName;
        }
        if (address) {
            user.address = address;
        }
        if (phone) {
            user.phone = phone;
        }
        // Save updated user
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
}

//Update the user password
const updatePasswordController = async (req, res) => {
    try {
        //find user
        const user = await User.findById({_id: req.user.id});
        // If user not found, return error (Validation)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        // Get the new password from the request user
        const { oldPassword, newPassword } = req.body;
        // Validate old password
        if (!oldPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                message: "Please provide old and new password",
            });
        }
        // Check if old password matches
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Old password is incorrect",
            });
        }
        // Hash the new password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(newPassword, salt);
        user.password = hashedPassword;
        // Save updated user
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password updated successfully",
        });

    }catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in updating password",
            error: error.message,
        });
    }
}
//Reset password controller
const resetPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        // Validate input
        if (!email || !answer || !newPassword) {
            return res.status(400).send({
                success: false,
                message: "Please provide email, answer and new password",
            });
        }
        const user = await User.findOne({email, answer});
        // If user not found, return error
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found or answer is incorrect",
            });
        }
        // Hash the new password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(newPassword, salt);
        user.password = hashedPassword;
        // Save updated user
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password reset successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in resetting password",
            error: error.message,
        });
    }
}

//Delete user controller
const deleteProfileController = async (req, res) => {
    try {
        await User.findByIdAndDelete({_id: req.params.id});
        return res.status(200).send({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in deleting user",
            error: error.message,
        });
    }
}

export { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController };


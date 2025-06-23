import express from 'express';
import { deleteProfileController, getUserController, resetPasswordController, updatePasswordController, updateUserController } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

// Import the user controller
// GET user || GET
router.get('/getUser',authMiddleware, getUserController);

// Update user || PUT
router.put('/updateUser', authMiddleware, updateUserController);

//Passport update || POST
router.post('/updatePassword', authMiddleware, updatePasswordController);

//Reset password || POST
router.post('/resetPassword', authMiddleware, resetPasswordController);

// Delete user || DELETE
router.delete('/deleteUser/:id', authMiddleware, deleteProfileController); 

export default router;

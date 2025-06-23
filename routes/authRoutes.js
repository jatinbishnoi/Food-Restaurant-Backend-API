import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';

const router = express.Router();

//routes 
// Register route || POST /api/auth/register
router.post('/register', registerController);
// Login route || POST /api/auth/login
router.post('/login', loginController);


export default router;

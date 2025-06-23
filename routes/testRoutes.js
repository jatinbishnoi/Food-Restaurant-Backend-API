import express from 'express';
import { testUserController } from '../controllers/testController.js'; // ✅ added .js

const router = express.Router();

// Test route
router.get("/test-user", testUserController);

export default router;

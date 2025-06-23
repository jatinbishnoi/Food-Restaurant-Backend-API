import express from 'express';
import { createResturantController, getAllResturantController, getResturantByIdController, deleteResturantController } from '../controllers/resturantController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

//routes
// Create a new restaurant || POST /api/v1/resturant/create
router.post('/create', authMiddleware, createResturantController);
//GET all restaurants || GET /api/v1/resturant/getall
router.get('/getAll', getAllResturantController);
// GET a single restaurant || GET /api/v1/resturant/get/:id
router.get('/get/:id', getResturantByIdController);
//Delete a restaurant || DELETE /api/v1/resturant/delete/:id
router.delete('/delete/:id', authMiddleware, deleteResturantController);
export default router;

import express from "express";
import { getAllFoods, getFoodById, addFood } from '../controllers/foodController.js';

const router = express.Router();

// adding food routes 
router.get('/', getAllFoods);
router.get('/:id', getFoodById);
router.post('/', addFood);

// Add more methods/routes later

export default router;
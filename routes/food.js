import express from "express";
import { getAllFoods, getFoodById, addFood } from '../controllers/foodController.js';
import { protect } from '../middleware/auth.js';
import { validate, foodSchema } from '../middleware/validation.js';

const router = express.Router();

// Add this route
router.get('/protected', protect, (req, res) => {
  res.json({
    success: true,
    message: "This is a protected route",
    user: req.user
  });
});

// adding food routes 
router.get('/', getAllFoods);
router.get('/:id', getFoodById);
router.post('/', validate(foodSchema), addFood);

// Add more methods/routes later

export default router;

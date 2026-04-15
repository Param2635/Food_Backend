import express from 'express';
import foodRouter from './food.js';

const router = express.Router();

// mounting all the routes
router.use('/food', foodRouter);

// checking health 
router.get('/', (req,res) => {
    res.json({
        success: true,
        message: 'Food api v1 is working',
        endpoints: ['/food'],
    });
});

export default router;
import express from 'express';
import foodRouter from './food.js';
import authRouter from './auth.js';

const router = express.Router();

// ======================
// Mount all sub-routers
// ======================
router.use('/auth', authRouter);
router.use('/food', foodRouter);

// ======================
// Base API route
// ======================
router.get('/', (req,res) => {
    res.json({
        success: true,
        message: 'Food api v1 is working',
        endpoints: ['/auth/register', '/auth/login', '/food']
    });
});

export default router;
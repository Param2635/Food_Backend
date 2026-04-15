// Imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import initializeDatabase from './config/initDb.js';

// Loading Envirenment Variable
dotenv.config();

// Initalize App & PORT
const app = express();
const PORT = process.env.PORT || 5001;

// ====================
// Middleware Setup
// ====================

// Security Middleware 
app.use(helmet());
app.use(morgan('dev'));

// Rate Limiting
const Limiter = rateLimit({
    serverRequest: 15 * 60 * 1000,  // minute * sec * ms // 15 minutes
    max: 100,                       // 100 requests per IP
    standardHeaders: true,          // Return rate limit info in headers
    legacyHeaders: false,           // Disable the old X-RateLimit headers
    message: {
        success: false,
        message: 'You have reached you Limit, please try again after sometime.'
    }
});
app.use(Limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended:true }));

// ====================
// Cors // its is important for Real Device & Simulation
// ====================
app.use(cors({
    // origin: [
    //     'https://localhost:3000', // for testing on web
    //     'https://10.0.2.2:5000', // for testing on android simulation
    //     'https://10.0.2.2', // extra if needed
    //     'https://196.168.1.*', // for hosting on local network(eg: same wifi/lan)
    //     '*'                                // ← Remove this in future for better security
    // ],
    origin: '*',
    method: ['GET', 'POST', 'PUT','DELETE', 'PATCH'],
    credentials: true,
    // allowdedHeaders: ['Contant-Type', 'Autherization']
}));

// Call it early
initializeDatabase();

// ====================
// Routes
// ====================
import mainRoute from './routes/index.js';

// Use routes with /api/v1 prefix 
app.use('/api/v1', mainRoute);

// ====================
// Global Level Error Handeling
// ====================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ====================
// Start Server 
// ====================

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend running on http://localhost:${PORT}`);
    console.log(`Network: http://localhost:${PORT}/api/v1/`); // ip we will use in our app
});
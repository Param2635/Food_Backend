// Imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

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

// Rate Limiting
const Limiter = rateLimit({
    serverRequest: 15 * 60 * 1000, // minute * sec * ms // 15 minutes
    max: 100,
    message: { success: false, message: 'You have reached you Limit, please try again after sometime.'}
})
app.use(Limiter);

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
    origin: true,
    method: ['GET', 'POST', 'PUT','DELETE', 'PATCH'],
    allowdedHeaders: ['Contant-Type', 'Autherization']
}));

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// Login
app.use(morgan('dev'));

// ====================
// Routes
// ====================

app.get('/', (req,res) => {
    res.json({
        success: true,
        message: 'Backend is Running successfully',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    });
});

// ====================
// testing route for flutter app
// ====================

app.get('/api/v1/health', (req, res) => {
    res.json({
        success: true,
        message: 'Testing Server is ready for app.',
        uptime: process.uptime(),
    });
});

// ====================
// Global Level Error Handeling
// ====================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.state(500).json({
        success: false,
        message: 'Something went wrong on the Server.',
        error: process.env.NODE_ENV === 'development' ? err.message: undefined
    });
});

// ====================
// Start Server 
// ====================

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`); // Shows Server Port No.
    console.log(`local: http://localhost:${PORT}`); // Shows localhost Port No.
    console.log(`Network: http://Our_local_ip`); // ip we will use in our app
    console.log(`run with npm run dev`); 
});
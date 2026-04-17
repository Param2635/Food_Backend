import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mainRouter from './routes/index.js';
import initializeDatabase from './config/initDb.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ======================
// Middleware
// ======================
app.use(helmet());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests from this IP' }
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS - Important for Flutter (update when deploying)
const corsOriginEnv = process.env.CORS_ORIGIN?.trim();
const corsOrigins = corsOriginEnv
  ? corsOriginEnv.split(',').map(s => s.trim()).filter(Boolean)
  : null;
const corsCredentials = process.env.CORS_CREDENTIALS === 'true';
if (corsCredentials && !corsOrigins) {
  console.warn('⚠️  CORS_CREDENTIALS=true requires CORS_ORIGIN to be set (cannot use credentials with origin="*").');
}
app.use(cors({
  origin: corsOrigins || '*', // Flutter mobile doesn't need CORS; this mainly matters for Flutter web.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: corsCredentials && !!corsOrigins
}));

// Initialize Database
initializeDatabase();

// ======================
// Routes
// ======================
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Food backend is running',
    apiBase: '/api/v1',
    health: '/health'
  });
});

app.get('/health', (req, res) => {
  res.json({ success: true, status: 'ok' });
});

app.use('/api/v1', mainRouter);

// ======================
// Global Error Handler
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// ======================
// Start Server
// ======================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Food Backend running on http://localhost:${PORT}`);
  console.log(`📱 Flutter can connect using your local IP: http://YOUR_IP:${PORT}/api/v1`);
});

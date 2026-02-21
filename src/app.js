import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';

import routes from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { sessionSetting, checkSubmit } from './middlewares/submited.js';
import { apiLimiter, globalLimiter } from './middlewares/rateLimit.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust proxy for Railway deployment (to get real IP for rate limiting)
app.set('trust proxy', 1);

// Security Middlewares
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable CORS if needed (adjust origins later as necessary)

// Global Rate Limiting
app.use(globalLimiter);

// Parse JSON and URLEncoded payloads
app.use(express.json({ limit: '10kb' })); // Limit body size to prevent abuse
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Session Middleware
app.use(sessionSetting);

// Static files & HTML routes
app.use('/success.html', checkSubmit);
app.use(express.static(path.join(__dirname, '../public')));

// Clean URL routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, '../public/about.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, '../public/register.html')));
app.get('/success', checkSubmit, (req, res) => res.sendFile(path.join(__dirname, '../public/success.html')));
app.get('/test-api', (req, res) => res.sendFile(path.join(__dirname, '../public/test-api.html'))); // Optional if needed

// API Routes with stricter rate limiting
app.use('/api', apiLimiter, routes);

// Central Error handling
app.use(errorHandler);

export default app;

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Clean URL routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, '../public/about.html')));
app.get('/members', (req, res) => res.sendFile(path.join(__dirname, '../public/members.html')));
app.get('/policy', (req, res) => res.sendFile(path.join(__dirname, '../public/policy.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, '../public/register.html')));
app.get('/success', (req, res) => res.sendFile(path.join(__dirname, '../public/success.html')));
app.get('/apply', (req, res) => res.sendFile(path.join(__dirname, '../public/apply.html')));

import { apiLimiter } from './middlewares/rateLimit.middleware.js';

app.use('/api', apiLimiter, routes);

// Error handling
app.use(errorHandler);

export default app;

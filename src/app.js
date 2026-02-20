import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';
import {sessionSetting , checkSubmit} from './middlewares/submited.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware'
app.use(sessionSetting);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/success.html', checkSubmit);
app.use(express.static(path.join(__dirname, '../public')));


// Routes
// Clean URL routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, '../public/about.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, '../public/register.html')));
app.get('/success',checkSubmit, (req, res) => res.sendFile(path.join(__dirname, '../public/success.html')));
app.get('/test-api', (req, res) => res.sendFile(path.join(__dirname, '../public/test-api.html'))); // Optional if needed

import { apiLimiter } from './middlewares/rateLimit.middleware.js';

app.use('/api', apiLimiter, routes);

// Error handling
app.use(errorHandler);

export default app;

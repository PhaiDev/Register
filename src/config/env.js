import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    gasApiKey: process.env.GAS_API_KEY,
    gasApisheet: process.env.SHEET_API,
    emailApiKey: process.env.EMAIL_API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    redisUrl: process.env.REDIS_URL
};

import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    gasApiKey: process.env.GAS_API_KEY || "https://script.google.com/macros/s/AKfycbwDnNs0dscoaW5oaBnEmVN_J5GYDTONFdM9EHY89CSZx3DK-1-w7-zuwVoknrl8jiInWg/exec",
    emailApiKey: process.env.EMAIL_API_KEY,
    jwtSecret: process.env.JWT_SECRET
};

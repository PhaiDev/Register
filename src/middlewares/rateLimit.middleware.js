import rateLimit from 'express-rate-limit';

/**
 * Global Rate Limiter
 * Applied to all requests to prevent basic DoS/DDoS attacks.
 */
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 นาที
    max: 300, // ร้องขอได้สูงสุด 300 ครั้งต่อ 15 นาทีต่อ 1 ไอพี
    message: {
        success: false,
        message: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true, // ส่ง RateLimit headers กลับไป
    legacyHeaders: false, // ข้าม X-RateLimit headers
});

/**
 * API Specific Limiter
 * Applied specifically to form submissions and sensitive endpoints.
 */
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 นาที
    max: 50, // ร้องขอ submit/api ได้สูงสุด 50 ครั้งต่อ 15 นาทีต่อ 1 ไอพี (เข้มงวดกว่า)
    message: {
        success: false,
        message: "You have exceeded the maximum number of form submissions. Please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Simple In-Memory Rate Limiter
 * limit: max requests within windowMs
 * windowMs: time window in milliseconds
 */
const rateLimit = (options) => {
    const hits = new Map();
    const { windowMs, max, message } = options;

    // Cleanup expired entries every minute
    setInterval(() => {
        const now = Date.now();
        for (const [ip, data] of hits.entries()) {
            if (now - data.startTime > windowMs) {
                hits.delete(ip);
            }
        }
    }, 60000);

    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const now = Date.now();

        let data = hits.get(ip) || { count: 0, startTime: now };

        // Reset if window passed
        if (now - data.startTime > windowMs) {
            data = { count: 0, startTime: now };
        }

        data.count++;
        hits.set(ip, data);

        if (data.count > max) {
            return res.status(429).json({
                success: false,
                message: message || "Too many requests, please try again later."
            });
        }

        next();
    };
};

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
});

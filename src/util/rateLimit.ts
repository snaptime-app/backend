import { rateLimit } from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    limit: 3, // Limit each IP to x requests per window
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

export { rateLimiter };

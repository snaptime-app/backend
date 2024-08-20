import { rateLimit } from "express-rate-limit";

const rateLimiter = (
    windowLengthMinutes: number,
    maxRequestsPerWindow: number,
) => rateLimit({
    windowMs: windowLengthMinutes * 60 * 1000, // 15 minutes
    limit: maxRequestsPerWindow, // Limit each IP to x requests per window
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

export { rateLimiter };

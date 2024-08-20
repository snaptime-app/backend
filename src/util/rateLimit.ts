import { rateLimit } from "express-rate-limit";

const rateLimiter = (
    windowLengthMinutes: number,
    maxRequestsPerWindow: number,
) => rateLimit({
    windowMs: windowLengthMinutes * 60 * 1000,
    limit: maxRequestsPerWindow, // Limit each IP to x requests per window
    message: {
        message: `This endpoint is rate-limited to ${maxRequestsPerWindow} requests per ${windowLengthMinutes} minutes. Please try again later.`,
    },
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

export { rateLimiter };

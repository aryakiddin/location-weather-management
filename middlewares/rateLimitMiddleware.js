const rateLimit = require('express-rate-limit');

const customRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // 20 requests per minute per IP
    message: 'Too many requests from this IP, please try again in a minute.',
  });

  
function customMiddleware(req, res, next) {
    customRateLimiter(req, res, (err) => {
      if (err) {
        return res.status(429).json({ message: 'Rate limit exceeded' });
      }
      
      // If rate limit is not exceeded, continue to the next middleware or route
      next();
    });
  }
  
  module.exports = customMiddleware;
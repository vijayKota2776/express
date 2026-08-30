const rateLimit = require('express-rate-limit');
const helmet = require('helmet');


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 2, 
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
});


const securityHeaders = helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
});

module.exports = { limiter, securityHeaders };
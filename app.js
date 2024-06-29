const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const routes = require('./routes/index');

const app = express();

// Middleware for security headers
app.use(helmet());

// Middleware for logging requests
app.use(morgan('combined'));

// Middleware to parse JSON bodies
app.use(express.json());

// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Use routes
app.use('/api', routes);

module.exports = app;

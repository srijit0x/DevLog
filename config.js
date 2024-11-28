require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    dbURI: process.env.DATABASE_URI,
    jwtSecret: process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'info'
};

module.exports = config;
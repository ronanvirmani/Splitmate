require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [process.env.FRONTEND_URL]; // Ensure FRONTEND_URL is set in your environment variables

const corsOptions = {
    origin: '*', // Allow all origins (for debugging purposes)
    credentials: true, // If you need to allow credentials (e.g., cookies)
};

app.use(cors(corsOptions));

// Logging Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log('MongoDB connection error:', error);
    });

module.exports = app;

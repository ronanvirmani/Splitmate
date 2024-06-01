require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:3000', "https://splitmate-frontend.onrender.com"];
const corsOptions = {
    origin: "*",
    credentials: true,
};

app.use(cors(corsOptions));

// Logging Middleware
app.use((req, res, next) => {
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

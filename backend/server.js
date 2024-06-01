require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:3000', "https://splitmate-frontend.onrender.com/dashboard"];
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
};

app.use(cors(corsOptions));

// Logging Middleware
app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

// Routes
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);

app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// middleware
app.use(express.json())

const allowedOrigins = [process.env.FRONTEND_URL]; // Ensure FRONTEND_URL is set in your environment variables

const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // If you need to allow credentials (e.g., cookies)
  };
  
app.use(cors(corsOptions));


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
        console.log('listening on port 4000!!')
        })
    })
    .catch((error) => {
        console.log(error)
    })


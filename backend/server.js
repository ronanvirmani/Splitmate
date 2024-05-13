require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

// middleware
app.use(express.json())

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


// common js module
const fs = require('fs');
const fsPromises = require("fs").promises;
const { error, profile } = require('console');
const path = require("path");

// npm module
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const multer = require('multer');
require('dotenv').config();

// mongoose imports
const User = require('./models/User');
const Post = require('./models/Post');

// middleware
const { reqLogger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

// Routers
const postRouter = require("./router/postRouter");
const authRouter = require("./router/authRouter");
const profileRouter = require("./router/profileRouter");

const app = express();
const uploadMiddleware = multer({ dest: 'uploads/' });

// env variables
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;


// Req logger
app.use(reqLogger);

// Cross Origin Resource Sharing
const whitelist = ['https://blog-gokul.vercel.app'];
const corsOption = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by cors'));
        }
    },
    optionSuccessStatus: 200,
    credentials: true,
}
app.use(cors(corsOption));

// express middleware
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(MONGO_URI);

app.get('/', (req, res) => {

    res.send("server working");

})

app.use('/profile', profileRouter);
app.use('/', authRouter);
app.use('/post', postRouter);


// Not found handler
app.all('*', (req, res) => {
    res.status(404).json({ error: '404 not found' });
})

app.use(errorHandler);

process.on('unhandledRejection', (reason, promise) => {
    console.log(`Unhandled Promise Rejection: ${reason}`);
});

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});
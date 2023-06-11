const express = require("express");
const app = express();;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require("fs");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

const salt = bcryptjs.genSaltSync(10);
const secret = "mySecretKey";

mongoose.connect("mongodb+srv://bansalgokul134:gokulmongo0@cluster0.nohi4wx.mongodb.net/?retryWrites=true&w=majority")

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            // password: ,
            password: bcryptjs.hashSync(password, salt),
        });
        res.status(200).json(userDoc);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }

})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });
        const passOK = bcryptjs.compareSync(password, userDoc.password);

        if (passOK) {

            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({ username, id: userDoc._id });
            });
        } else {
            res.status(400).json({ error: "Wrong credentials" });
        }

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }

})

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', "").json({ message: "Logout successful" });
})

app.post("/post", uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
    })
    res.json(postDoc);
})

app.listen(4000);

// mongodb+srv://bansalgokul134:<password>@cluster0.nohi4wx.mongodb.net/?retryWrites=true&w=majority
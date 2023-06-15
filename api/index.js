const express = require("express");
const app = express();;
const cors = require("cors");
const path = require("path")
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require("fs");
const PORT = process.env.PORT || 3030;

app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
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

    const { token } = req.cookies;
    const userInfo = jwt.verify(token, secret);
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: userInfo.id,
    })
    res.json(postDoc);
})

app.put("/post", uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        newPath = path + "." + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    const userInfo = jwt.verify(token, secret);
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = (JSON.stringify(postDoc.author) === JSON.stringify(userInfo.id));
    if (!isAuthor) {
        res.status(401).json({ error: "Invalid, You are not the author" })
    }

    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    postDoc.cover = newPath || postDoc.cover;

    const updatedPost = await postDoc.save();
    res.json(updatedPost);

})


app.get('/post', async (req, res) => {
    const posts = await Post.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20);
    res.json(posts);
})

app.get('/post/:id', async (req, res) => {
    const postId = req.params.id;
    const postDoc = await Post.findById(postId).populate('author', ['username']);
    res.json(postDoc);
})

app.listen(PORT, () => {
    console.log("listening to port" + PORT);
});

// mongodb+srv://bansalgokul134:<password>@cluster0.nohi4wx.mongodb.net/?retryWrites=true&w=majority
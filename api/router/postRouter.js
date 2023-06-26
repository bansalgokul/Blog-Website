const express = require("express");
const router = express.Router();
const postController = require('../controller/postController');
const multer = require("multer");
const uploadMiddleware = multer({ dest: 'uploads/' });

router.route('/')
    .get(postController.getPost)
    .post(uploadMiddleware.single('file'), postController.uploadPost)
    .put(uploadMiddleware.single('file'), postController.updatePost)

router.route('/:id')
    .get(postController.getPostById)

module.exports = router;
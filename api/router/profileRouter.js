const express = require("express");
const router = express.Router();
const profileController = require('../controller/profileController');

router.route('/')
    .get(profileController.getProfile);

module.exports = router;
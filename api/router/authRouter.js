const express = require("express");
const router = express.Router();
const authController = require('../controller/authController');

router.route('/login')
    .post(authController.loginUser);
router.route('/register')
    .post(authController.registerUser);
router.route('/logout')
    .post(authController.logoutUser);

module.exports = router;
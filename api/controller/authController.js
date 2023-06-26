const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;
const salt = bcrypt.genSaltSync(10);

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {

        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        // logged in
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {
                sameSite: 'None',
                secure: false,
            }).json({
                id: userDoc._id,
                username,
            });
        });
    } else {
        res.status(400).json('wrong credentials');
    }

}
const logoutUser = (req, res) => {
    res.cookie('token', '').json('ok');
}

module.exports = { registerUser, loginUser, logoutUser };
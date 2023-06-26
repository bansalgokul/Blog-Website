const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

const getProfile = (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
}

module.exports = { getProfile };
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('../config')


const createAccessToken = function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: '1d'
            },
            (err, token) => {
                if(err) reject
                resolve(token)
            });
    });
}

module.exports = createAccessToken

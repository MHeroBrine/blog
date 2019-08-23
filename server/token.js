const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// token生成
const generateToken = function(data) {
    let created = Math.floor(Date.now() / 1000);
    let cert = fs.readFileSync(path.join(__dirname, './config/rsa_private_key.pem')); // 私钥
    let token = jwt.sign({
        data,
        exp: created + 3600 * 2400
    }, cert, { algorithm: 'RS256' })
    return token;
}   

// token验证
const verifyToken = function(token) {
    let cert = fs.readFileSync(path.join(__dirname, './config/rsa_public_key.pem')); // 公钥
    try {
        let result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {};
        let { exp = 0 } = result, current = Math.floor(Date.now() / 1000);
        if (current <= exp) {
            res = result.data || {};
        }
        return res;
    } catch (e) {

    }
    return null;
}

module.exports = { generateToken, verifyToken }
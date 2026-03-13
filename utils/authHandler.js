let jwt = require('jsonwebtoken')
let fs = require('fs')
let path = require('path')
let userController = require('../controllers/users')

// Khóa public dùng để verify JWT với thuật toán RS256
let publicKeyPath = path.join(__dirname, '..', 'keys', 'jwt_public.pem');
let publicKey = fs.readFileSync(publicKeyPath);
module.exports = {
    checkLogin: async function (req, res, next) {
        let token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer")) {
            res.status(403).send("ban chua dang nhap");
        }
        token = token.split(" ")[1];
        try {//private - public
            let result = jwt.verify(token, publicKey, {
                algorithms: ['RS256']
            })
            let user = await userController.FindById(result.id)
            if (!user) {
                res.status(403).send("ban chua dang nhap");
            } else {
                req.user = user;
                next()
            }
        } catch (error) {
            res.status(403).send("ban chua dang nhap");
        }

    }
}
var express = require('express');
var router = express.Router();
let userController = require('../controllers/users')
let { RegisterValidator, handleResultValidator } = require('../utils/validatorHandler')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let fs = require('fs')
let path = require('path')
let { checkLogin } = require('../utils/authHandler')

// Khóa private dùng để ký JWT với thuật toán RS256
let privateKeyPath = path.join(__dirname, '..', 'keys', 'jwt_private.pem');
let privateKey = fs.readFileSync(privateKeyPath);
/* GET home page. */
router.post('/register', RegisterValidator, handleResultValidator, async function (req, res, next) {
    let newUser = userController.CreateAnUser(
        req.body.username,
        req.body.password,
        req.body.email,
        "69aa8360450df994c1ce6c4c"
    );
    await newUser.save()
    res.send({
        message: "dang ki thanh cong"
    })
});
router.post('/login', async function (req, res, next) {
    let { username, password } = req.body;
    let getUser = await userController.FindByUsername(username);
    if (!getUser) {
        res.status(403).send("tai khoan khong ton tai")
    } else {
        if (getUser.lockTime && getUser.lockTime > Date.now()) {
            res.status(403).send("tai khoan dang bi ban");
            return;
        }
        if (bcrypt.compareSync(password, getUser.password)) {
            await userController.SuccessLogin(getUser);
            let token = jwt.sign(
                {
                    id: getUser._id
                },
                privateKey,
                {
                    algorithm: 'RS256',
                    expiresIn: '30d'
                }
            )
            res.send(token)
        } else {
            await userController.FailLogin(getUser);
            res.status(403).send("thong tin dang nhap khong dung")
        }
    }

});
router.get('/me', checkLogin, function (req, res, next) {
    res.send(req.user)
})

// Đổi mật khẩu - yêu cầu đã đăng nhập
router.post('/change-password', checkLogin, async function (req, res, next) {
    try {
        let { oldPassword, newPassword } = req.body;

        // Kiểm tra đủ trường
        if (!oldPassword || !newPassword) {
            return res.status(400).send("thieu thong tin mat khau cu hoac mat khau moi");
        }

        // Validate mật khẩu mới: tối thiểu 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).send("mat khau moi khong dap ung yeu cau bao mat");
        }

        // Kiểm tra mật khẩu cũ
        if (!bcrypt.compareSync(oldPassword, req.user.password)) {
            return res.status(403).send("mat khau cu khong chinh xac");
        }

        // Cập nhật mật khẩu mới (hook pre('save') sẽ tự hash)
        req.user.password = newPassword;
        await req.user.save();

        res.send({
            message: "doi mat khau thanh cong"
        });
    } catch (error) {
        next(error);
    }
})


module.exports = router;

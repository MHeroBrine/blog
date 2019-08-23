const token = require('../../token');

const express = require('express');
const User = require('../models/user');

const ID = require('../../ID');

const router = express.Router();

// 新增用户
router.post('/', function(req, res) {
    if (ID.getId()) {
        let { account, password } = req.body;
        let user = new User({
            account: account,
            password: password
        })
        user.save(function(err) {
            if (err) {
                res.json({
                    success: false,
                    message: '添加失败'
                })
            }
        })
        res.json({
            success: true,
            message: '添加成功'
        })
    } else {
        res.json({
            success: false,
            message: '权限不足'
        })
    }
})

// 登录
router.post('/login', function(req, res) {
    let account = req.body.account;
    User.findOne({ account: account }, function(err, user) {
        if (err) {
            res.json({
                success: false,
                message: '登录失败'
            })
        }
        if (req.body.password === user.password) {
            let _token = token.generateToken(user._id);
            res.json({
                success: true,
                token: _token,
                message: '登陆成功'
            })
        } else {
            res.json({
                success: false,
                message: '登录失败'
            })
        }
    })
})

// 验证登录
router.get('/', function(req, res) {
    if (ID.getId()) {
        res.json({
            success: true,
            message: '身份验证成功'
        })
    } else {
        res.json({
            success: false,
            message: '身份验证失败'
        })
    }
})

module.exports = router;
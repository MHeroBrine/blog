const express = require('express');
const Draft = require('../models/draft');

const router = express.Router();

// 获取所有草稿信息
router.get('/', function(req, res) {
    Draft.find({}, function(err, draft) {
        if (err) {
            res.json({
                success: false,
                data: '获取草稿失败'
            })
        } else {
            res.json({
                success: true,
                data: draft
            })
        }
    })
})

// 添加草稿文件
router.post('/', function(req, res) {
    let { title, body, introduce, category } = req.body;
    let draft = new Draft({
        title: title,
        body: body,
        introduce: introduce,
        category: category
    })
    draft.save(function(err, draft) {
        if (err) {
            res.json({
                success: false,
                message: '添加草稿失败'
            })
        } else {
            res.json({
                success: true,
                message: '添加草稿成功',
                id: draft._id
            })
        }
    })
})

// 修改草稿文件
router.put('/', function(req, res) {
    let { _id, newTitle, newBody, introduce, newCategory } = req.body;
    Draft.update({
        _id: _id
    }, {
        title: newTitle,
        body: newBody,
        introduce: introduce,
        category: newCategory
    }, function(err, draft) {
        if (err) {
            res.json({
                success: false,
                message: '更新失败'
            })
        } else {
            res.json({
                success: true,
                message: '更新成功'
            })
        }
    })
})

// 删除草稿
router.delete('/', function(req, res) {
    let _id = req.query.id;
    
    Draft.remove({ _id: _id }, function(err) {
        if (err) {
            res.json({
                success: false,
                message: '删除草稿失败'
            })
        } else {
            res.json({
                success: true,
                message: '删除草稿成功'
            })
        }
    })
})

module.exports = router;
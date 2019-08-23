const express = require('express');
const Category = require('../models/category');
const router = express.Router();

const ID = require('../../ID');

// 添加分类
router.post('/', function(req, res) {
    if (ID.getId()) {
        let title = req.body.title;
        let category = new Category({
            title: title
        })
        category.save(function(err) {
            if (err) {
                res.json({
                    success: false,
                    message: '添加分类失败'
                })
            }
        })
        res.json({
            success: true,
            message: '添加分类成功'
        })
    } else {
        res.json({
            success: false,
            message: '权限不足'
        })
    }
})

// 获取所有分类
router.get('/', function(req, res) {
    if (ID.getId()) {
        Category.find({}, function(err, categories) {
            if (err) {
                res.json({
                    success: false,
                    data: '获取失败'
                })
            }
            res.json({
                success: true,
                data: categories
            })
        })
    } else {
        res.json({
            success: false,
            message: '权限不足'
        })
    }
})

// 更新分类
router.put('/', function(req, res) {
    if (ID.getId()) {
        // 解构赋值
        let { title, newTitle } = req.body;
        Category.findOneAndUpdate({ title: title }, { title: newTitle }, function(err, category) {
            if (err) {
                res.json({
                    success: false,
                    message: '更新分类失败'
                })
            }
        })
        res.json({
            success: true,
            message: '更新分类成功！'
        })
    } else {
        res.json({
            success: false,
            message: '权限不足'
        })
    }
})

// 删除分类
router.delete('/', function(req, res) {
    if (ID.getId()) {
        // 解构赋值
        let { title } = req.body;

        Category.remove({ title: title }, function(err) {
            if (err) {
                res.json({
                    success: false,
                    message: '删除分类失败'
                })
            }
        })
        res.json({
            success: true,
            message: '删除分类成功'
        })
    } else {
        res.json({
            success: false,
            message: '权限不足'
        })
    }
})


module.exports = router;
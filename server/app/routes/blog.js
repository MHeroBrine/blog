const express = require('express');
const Blog = require('../models/blog');
const multer = require('multer');
const fs = require('fs');

// 设置图片存储路径
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage: storage }).array("imgUploader", 3);

const ID = require('../../ID');

const router = express.Router();

// 显示所有博客简介
router.get('/', function (req, res) {
    Blog.find({}, function (err, blog) {
        if (err) {
            res.json({
                success: false,
                data: '获取博客失败'
            })
        } else {
            for (let item in blog) {
                blog[item].body = null;
            }
            res.json({
                success: true,
                data: blog
            })
        }
    })
})

// 根据标签查找博客简介
router.get('/withCategory', function (req, res) {
    let category = req.query.category;
    Blog.find({ category: category }, function (err, blog) {
        if (err) {
            res.json({
                success: false,
                data: '查找博客失败'
            })
        } else {
            for (let item in blog) {
                delete blog[item].body;
            }
            res.json({
                success: true,
                data: blog
            })
        }
    })
})

// 根据_id查找博客详情
router.get('/withId', function (req, res) {
    let _id = req.query._id;
    Blog.findOne({ _id: _id }, function (err, blog) {
        if (err) {
            res.json({
                success: false,
                data: '查找博客失败'
            })
        } else {
            res.json({
                success: true,
                data: blog.body
            })
        }
    })
})

// 添加博客
router.post('/', function (req, res) {
    if (ID.getId()) {
        console.log(ID.getId())
        let { title, body, introduce, category } = req.body;
        let blog = new Blog({
            title: title,
            body: body,
            introduce: introduce,
            category: category,
            date: new Date()
        })
        blog.save(function (err) {
            if (err) {
                res.json({
                    success: false,
                    message: '添加博客失败'
                })
            }
        })
        res.json({
            success: true,
            message: '添加博客成功'
        })
    } else {
        res.json({
            success: false,
            message: '权限不足'
        })
    }
})

// 修改博客
router.put('/', function (req, res) {
    if (ID.getId()) {
        let { _id, newTitle, newBody, newCategory } = req.body;
        Blog.update({
            _id: _id
        }, {
                title: newTitle,
                body: newBody,
                category: newCategory,
                date: new Date()
            }, function (err, blog) {
                if (err) {
                    res.json({
                        success: false,
                        message: '更新失败'
                    })
                }
                res.json({
                    success: true,
                    message: '更新成功'
                })
            })
    } else {
        res.json({
            success: false,
            message: '权限不足'
        })
    }
})

// 删除博客
router.delete('/', function (req, res) {
    if (ID.getId()) {
        let _id = req.query.id;
        console.log(_id);

        Blog.remove({ _id: _id }, function (err) {
            if (err) {
                res.json({
                    success: false,
                    message: '删除博客失败'
                })
            }
            res.json({
                success: true,
                message: '删除博客成功'
            })
        })
    } else {
        res.json({
            success: false,
            message: '权限不足'
        })
    }
})

// 点赞
router.post('/thumb', function (req, res) {
    let { _id } = req.body;
    Blog.findOne({ _id: _id }, function (err, blog) {
        if (err) {
            res.json({
                success: false,
                message: '该博客已消失'
            })
        }
        let { thumb } = blog;
        Blog.update({ _id: _id }, { thumb: ++thumb }, function (err) {
            if (err) {
                res.json({
                    success: false,
                    message: '更新失败'
                })
            }
            res.json({
                success: true,
                message: '操作成功'
            })
        })
    })
})

// 上传图片
router.post('/upload', function (req, res) {
    upload(req, res, function(err) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: '上传失败'
            })
        } else {
            res.json({
                success: true,
                data: req.files[0].filename,
                message: '上传成功'
            })
        }
    })
})
// 读取图片
router.get('/img', function(req, res) {
    let path = req.query.path;

    fs.readFile('./Images/' + path, 'binary', function(err, file) {
        if (err) {
            console.log(err);
        } else {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.write(file, 'binary');
            res.end();
        }
    })
})

module.exports = router;
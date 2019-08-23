const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');

const http = require('http');
const https = require('https');

const token = require('./token');
const ID = require('./ID');

const config = require('./config');

// 设置跨域访问
app.all('*', function(req, res, next) {
    // 允许任何来源
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // 允许发送Cookies
    res.header("Access-Control-Allow-Credentials", "true");
    // 允许header access-token
    res.header("Access-Control-Allow-Headers", "X-Requested-With, access-token");
    // 允许的Methods
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // 允许的Content-type
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

const port = process.env.PORT || 4000;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));                

app.use((req, res, next) => {
    let { url = '' } = req;
    if( req.url == "/favicon.ico") { 
        return;
    }  
    if (req.method === 'OPTIONS') {
        return next();
    }
    if (url != '/user/login') {
        let _token = null;
        if (req.headers['access-token']) {
            _token = req.headers['access-token'];
        } else {
            _token = null;
        }
        if (token) {
            let result = token.verifyToken(_token);
            if (result) {
                ID.setId(result);
                return next();
            } else {
                ID.setId(null);
                return next();
            }
        } else {
            ID.setId(null);
            return next();
        }
    } else {
        return next();
    }
})

// app.listen(port);
// console.log('Blog is listening http://localhost:' + port);

var key = fs.readFileSync('/etc/letsencrypt/live/mherobrine.com/privkey.pem', 'utf8');
var cert = fs.readFileSync('/etc/letsencrypt/live/mherobrine.com/cert.pem', 'utf8');

var options = {
    key: key,
    cert: cert
}

https.createServer(options, app).listen(port, function() {
    console.log('HTTPS server listening on ' + port);
});
// console.log('Blog is listening http://localhost:' + port);

// 路由
const userRoute = require('./app/routes/user');
const categoryRoute = require('./app/routes/category');
const blogRoute = require('./app/routes/blog');

app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/blog', blogRoute);
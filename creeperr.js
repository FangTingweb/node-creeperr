

var express = require("express");
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 



// 监听路由
let router = require('./router.js');

app.use('/', router);
app.listen('3000', function (req, res) {
  console.log('-----------------------------------')
})
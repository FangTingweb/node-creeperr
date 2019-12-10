var express = require('express')
const  {getMovio} = require('./getdata.js')

const router = express.Router()
router.use(function(req, res, next) {
    next();
  });
router.post('/page', function(req, res, next) {
    var currentPage = req.body.page;
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Cache-Control","no-cache");
    var curData = null;
    getMovio(currentPage,curData).then((data) =>{
      res.json({data:data})
    })
  
    // res.json({data:data})
   
});
router.get('/text', function(req, res, next) {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Cache-Control","no-cache");
    console.log(req.params)
    console.log(req.query)
    res.send("hi:Get")
});

  module.exports = router
  console.log("1111111111")


var request =  require('request');
var cheerio = require('cheerio');
var fs = require('fs');
const xlsx = require('node-xlsx');


//获取命令行参数 process.argv
// var target_url ={
//     url: 'https://www.douban.com/group/554566/discussion?start='+page,
//     method : 'GET',
//     headers: {
//        "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36"
//     },
// };

function getMovio(curPpage, allAdata){
        var page =Number(curPpage)*25
        var target_url ={
            url: 'https://www.douban.com/group/554566/discussion?start='+page,
            method : 'GET',
            headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36"
            },
        };
        return new Promise((resove, reject) =>{
            request(target_url ,function(err, response, body){
                if (!err && response.statusCode == 200) {
                    var $ = cheerio.load(body);
                       domFunc($, function(allAdata){
                         resove(allAdata)
                       })
                      
                    }
                })
        }) 
  }

function domFunc($,callback){
    var data = {},
    xlsData=[  
      {name : 'sheet1',data :[['标题', '链接']]}
     ]
   $('.article .olt tr').each(function(idx, item){
     $(item).find('.title a').attr('title')
     if(!data[idx]){
       data[idx] = {};
       xlsData[0].data[idx+1] = []
     }
     data[idx].title =  $(item).find('.title a').attr('title')
     data[idx].href =  $(item).find('.title a').attr('href')
     xlsData[0].data[idx+1].push($(item).find('.title a').attr('title'))
     xlsData[0].data[idx+1].push($(item).find('.title a').attr('href'))
   })
 
   allAdata = data;
   callback(allAdata)
   //生成文件
   // fs.mkdir("./data", function(err){
   //   fs.writeFile('./data/data.json',JSON.stringify(data), function name(params) {
   //     console.log("success")
   //   })
   //   fs.writeFile('./data/data.xls',xlsx.build(xlsData), function name(params) {
   //     console.log("success")
   //   })
   // })
}

exports.getMovio = getMovio
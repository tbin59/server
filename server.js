var http = require('http');
var express = require('express');
var fs = require('fs');
const request = require('request')
var app = express();
var server = http.createServer(app);

//第一題
app.get('/hello/:reply',function(req, res){//:reply對應client-test.js中的getParamter
	let ans1 ={"reply":"hello "+req.params.reply};
	//回傳結果在server端
    console.log(JSON.stringify(ans1));
    //回傳結果給Client端
    res.write(JSON.stringify(ans1));
    res.end();
    });
//第二題
 app.post('/hello/:reply',function(req, res){//:reply對應client-test.js中的postParamter
    let body = '';
    req.on('data', function (data) {
        body += data;
        let jsonBody = JSON.parse(body);//將body轉成object
        let ans2 = JSON.stringify({"reply":req.params.reply+"\'s job is "+jsonBody.job});
        //回傳結果在server端
        console.log(ans2);
        //回傳結果給Client端
        res.write(JSON.stringify(ans2));
        res.end();
    });
});
//第三題
app.post('/file/:id',(req,res) => {//:id對應client-test.js中的uploadFileParameter
	let writeStream = fs.createWriteStream('test.mp4')
	req.on('data',(chunk)=>{
		writeStream.write(chunk)
	});
	req.on('end',()=>{
	   writeStream.end()
	   let size = (req.headers['content-length']/1024); //單位轉換(byte轉kb)
	   let ans3 =JSON.stringify({ "size" : "save file size "+size+" kb" });
       //回傳結果在server端
	   console.log(ans3)
	   //回傳結果給Client端
	   res.write(JSON.stringify(ans3));
	   res.end()
	   });
  });
//Server偵測port:8080的連線
server.listen(8080,function(){
});

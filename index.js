const { chapterList, userList} = require('./shujv'),
      http = require('http'),
      fs = require('fs'),
      path = require('path'),
      url = require('url'),
      qs=require("querystring");

var now={};

var Id;

http.createServer((req,res)=>{

    if(req.url === '/login'){

        var paths = path.join(__dirname,'login.html');

        res.writeHead(200,{'Content-Type':'text/html'});

        fs.readFile(paths,'utf-8',(err,data)=>{
            if(err){
                console.log(err);
            }else{    
                res.end(data);
            }
        })

    }else if(url.parse(req.url).pathname == '/listmanager'){

        var username=url.parse(req.url, true).query.username;
        var pwd=url.parse(req.url, true).query.pwd;

        if( username== userList[0].username &&  pwd==userList[0].pwd ){
            var paths = path.join(__dirname,'list.html');
            res.writeHead(200,{'Content-Type':'text/html'});

            fs.readFile(paths,'utf-8',(err,data)=>{
                if(!err){
                    res.end(data);
                }
            })
        }else{

            var paths = path.join(__dirname,'login.html');

            res.writeHead(200,{'Content-Type':'text/html'});
            
            fs.readFile(paths,'utf-8',(err,data)=>{
                if(!err){    
                    res.end(data);
                }
        })
        }
    }else if(req.url === '/list'){

        var listPath = path.join(__dirname,'chapterList.html');
        res.writeHead(200,{'Content-Type':'text/html'});

        fs.readFile(listPath,'utf-8',(err,data)=>{
            if(!err){
                res.end(data);
            }
        })
    }
    else if(req.url == '/chaplist/'){
        res.write(JSON.stringify(chapterList));
        res.end();
    }
    else if(url.parse(req.url).pathname == '/detail'){

            var paths = path.join(__dirname,'chapter.html');
            Id=url.parse(req.url).query.replace(/chapterId=/,"")-1;
            res.writeHead(200,{'Content-Type':'text/html'});

            fs.readFile(paths,'utf-8',(err,data)=>{
                if(!err){
                    res.end(data);
                }
            })
    }else if(req.url === '/addChapter/'){

        var listPath = path.join(__dirname,'addChapter.html');
        res.writeHead(200,{'Content-Type':'text/html'});

        fs.readFile(listPath,'utf-8',(err,data)=>{
            if(!err){
                res.end(data);
            }
        })
    }
    else if(req.url == '/tits/'){
        res.write(JSON.stringify(chapterList));
        res.end();
    }else if(req.url == '/now/'){
        res.writeHead(200,{'Content-Type':'text/json'});
            now=chapterList[Id];  
            res.end(JSON.stringify(now));
    }else if(req.url == '/addtit'){

        var newList1 = {};
        var data= ""; 

        req.addListener("data",(post)=> {
            data += post;
            var title=qs.parse(data).title;
            var content=qs.parse(data).content;

            newList1.chapterDes=content;
            newList1.chapterContent=content;
            newList1.chapterId=chapterList.length+1;
            newList1.chapterName=title;
            newList1.author="admin";
            newList1.views=1;
            newList1.imgPath='';
            newList1.publishTimer= "2019-10-27";
            chapterList.push(newList1);
        });
    }else if(req.url !== '/'){
        var urls = '.'+req.url;
        res.writeHead(200,{'Content-type':"text/css"});
        fs.readFile(urls,(err, data)=> {
            if (!err){
                res.end(data);
            }
        });
    }

}).listen(8083);
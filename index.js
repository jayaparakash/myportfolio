import http from 'http';
import fs from 'fs';
import querystring from 'querystring';
import { fileURLToPath } from 'url';
import path from 'path';

let server = http.createServer((req,res)=>{

    const __fileName =  fileURLToPath(import.meta.url)
    const __dirName = path.dirname(__fileName)

    if (req.method === 'GET' && req.url=== '/') {
        
        return fs.readFile(path.join(__dirName , "feedback.html"),(err,data)=>{
            if (err) res.end('Error occured') ; res.end(data) 
        })
    }

     if (req.method === 'POST' && req.url=== '/submit-feedback') {

        let body =''
        req.on('data',chunk => body+=chunk)

        req.on('end',()=>{
            let {name,message,email,mobile} = querystring.parse(body)

            fs.appendFile('feedback.txt',`name:${name} , email:${email} ,mobile:${mobile} message:${message}\n` , (err)=>
                res.end(err ? 'Error Interputed':'Feedback submitted successfully')
            )
        })
      return
    }

    res.writeHead(404); res.end('Page Not Found')



})

server.listen(3000, ()=> console.log('http://localhost:3000/'))
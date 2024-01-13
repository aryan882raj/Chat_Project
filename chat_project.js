const http = require('http'); 
const fs =require('fs');   // file system

const server = http.createServer((req,res)=>{
    // console.log(req.url , req.method ,req.headers);
    const url =req.url 
    const method = req.method

    if(url==='/'){                          // url nothing
        fs.readFile("message.text" , 'utf8', (err, data) => {
            if(err){
                console.log(err);
            }
            console.log(`DATA FROM FILE ` + data);
            res.write('<html>'); 
            res.write(`<body>${data}</body>`);
            res.write('</html>');
            
        })
        res.write('<html>'); 
        res.write('<head><title>ENTER MESSAGE</title></head>');
        
        res.write(`<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">SEND</button></form></body>`);
        res.write('</html>');
        return res.end();
        
    }
    if(url==='/message' && method==='POST'){         //read from file save in file
        const body =[];
        req.on('data', (chunk)=>{                    //get user value
            console.log(chunk);
            body.push(chunk)
        });

        return req.on('end',()=>{                        //to avoid run bellow line first run this
            const parsedBody = Buffer.concat(body).toString();
            console.log("parsedbody>>>>",parsedBody);
            const message = parsedBody.split('=')[1];     //['message','my name is aryan']

            //fs.writeFileSync    ------it will not update value on screen 
            fs.writeFile('message.text',message) // create file and write DUMMY in it  by default dummy 
            res.statusCode=302;
            res.setHeader('Location','/');               // '/ same location
            res.end();
        });  
        
               
    }
    // after clicking send it navigate page url= /message and name message   
    res.setHeader('Content-Type','text/html');
    res.write('<html>')    // write html page
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>NAVIGATED</h1></body>');
    res.write('</html>')
    res.end() 
    
});
server.listen(3000);
const http = require('http');
const fs = require("fs");
const port = process.env.PORT || 3002;

http.createServer((req, res)=>{
	render(req, res);
}).listen(port,"0.0.0.0",()=>{	console.log(`rodando: localhost:${port}`);	});

async function render(req, res){
	const pastaDefault="/STATIC";
	const arquivo=req.url;
	let arquivoPadrao="";
	const map = {
    '.ico':		'image/x-icon',
    '.html':	'text/html',
    '.js':		'text/javascript',
    '.json': 	'application/json',
    '.css': 	'text/css',
    '.png': 	'image/png',
    '.jpg': 	'image/jpeg',
    //'.wav': 'audio/wav',
    //'.mp3': 'audio/mpeg',
    //'.svg': 'image/svg+xml',
    '.pdf': 	'application/pdf',
	   //'.doc': 'application/msword',
  };
	if(arquivo.split('.').length==1){
		arquivoPadrao="index.html";
	}
	//console.log("."+pastaDefault+arquivo+arquivoPadrao);
	const page=(__dirname.replace('\\src','')+pastaDefault+arquivo+arquivoPadrao).replaceAll("\\","/");
	console.log(page);
	fs.readFile(page ,(erro, pageRes)=>{
		if (erro) {
	    res.writeHead(404);
	    //res.write();
	   	res.write('Contents you are looking are Not Found');
		}
		else if(map["."+page.split('.')[1]]===undefined){
			res.writeHead(404);
		  res.write('Content you are looking for cannot be Accessed.');
		}
		else {
	    res.writeHead(200, { 'Content-Type': map["."+page.split('.')[1]] });
	    res.write(pageRes);
		}
		res.end();
	});
}
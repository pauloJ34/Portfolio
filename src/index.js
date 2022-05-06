const http = require('http');
const fs = require("fs");
const port= 3002;

http.createServer((req, res)=>{
	render(req, res);
}).listen(port,()=>{	console.log(`radando: localhost:${port}`);	});

async function render(req, res){
	const pastaDefault="/static";
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
	const page="."+pastaDefault+arquivo+arquivoPadrao;
	fs.readFile(page ,(erro, pageRes)=>{
		if (erro) {
		    res.writeHead(404);
		    res.write('Contents you are looking are Not Found');
		}
		else if(map["."+page.split('.')[2]]===undefined){
			res.writeHead(404);
		    res.write('Content you are looking for cannot be Accessed.');
		}
		else {
		    res.writeHead(200, { 'Content-Type': map["."+page.split('.')[2]] });
		    res.write(pageRes);
		}
		res.end();
	});
}
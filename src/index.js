const http = require('http');
const fs = require("fs");
const port = process.env.PORT || 3002;

http.createServer((req, res)=>{
	render(req, res);
}).listen(port,"0.0.0.0",()=>{	console.log(`rodando: localhost:${port}`);	});

async function render(req, res){
	const pastaDefault="/STATIC";
	const arquivo=req.url;
	const arquivoPadrao = arquivo.split('.').length==1 ? "index.html" : "";
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

	const page=((__dirname+pastaDefault+arquivo+arquivoPadrao).replaceAll("\\","/")).replace('/src','');
	console.log(page);
	fs.readFile(page ,(erro, pageRes)=>{
		if (erro) {
	    res.writeHead(404);
	    //res.write(erro.toString())
	   	res.write('Contents you are looking are Not Found');
		}
		else if(map["."+page.split('.')[1]]===undefined){
			res.writeHead(404);
		  res.write('Content you are looking for cannot be Accessed.');
		}
		else {
	    res.writeHead(200, { 'Content-Type': map[`.${page.split('.')[1]}`] });
	    res.write(pageRes);
		}
		res.end();
	});
}
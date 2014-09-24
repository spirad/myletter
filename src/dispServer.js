var http = require("http");
var url = require( "url" );
var fs = require('fs');
var util = require('util');
var queryString = require( "querystring" );


function start() {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		var file = __dirname + pathname;
		console.log("URL of request " + request.url);
		console.log("checking for static file " + file);
		console.log("Request for " + pathname + " received.");
		if(request.url=='/') {
			response.writeHead(200, {'Content-Type': 'text/html'});
			fs.createReadStream('index.html').pipe(response);
			return;
		} 
	
		fs.exists(file, function(exists) {
			if (exists) {
				fs.stat(file, function (err, stats) {
					if (stats.isFile()) {
						var fileExtensions = { 
							'html':'text/html',
							'css':'text/css',
							'js':'text/javascript',
							'json':'application/json',
							'png':'image/png',
							'jpg':'image/jpg',
							'pdf':'application/pdf',
							'wav':'audio/wav'
						},
						ext = require('path').extname(file),
						type= 'text/html';
						for(var i in fileExtensions) {
							if (ext === i) {
								type = fileExtensions[i]
								break
							}
						}
						response.writeHead(200, { 'Content-Type': type })
						fs.createReadStream(file).pipe(response)
						console.log('served  '+request.url)
					}
					else {
						console.log( "handling request	");
						var chunk = '', data = '';
						request.on('data', function (data) {
							console.log( "getting new chunk of data");
							chunk += data;
						});
						request.on('end', function () {
							console.log(chunk + "<-Posted Data Test");
							console.log("Parsed Data " + queryString.parse(chunk));
							if (chunk.length> 0) {
								//var obj = JSON.parse(  );
								//data = queryString.parse(chunk)
								data = data + chunk;
								console.log("my chunked object: %o", data)
								//console.log("the query object:" + obj['id'])
								//var urlElements = pathname.split("/");	
								//console.log("url element:" + urlElements[1])
								//service/version/ressource
								//response.end(util.inspect(queryString.parse(chunk)));
							}
							var controllerPath =  "."+	 pathname + "/" + "handler.js";
							console.log("checking " + "."+ pathname + "/" + "handler.js");
							fs.exists(controllerPath, function(exists) {
								if (exists) {
									console.log("instantiating " + "."+  + pathname + "/" + "handler.js");
									var controller = require("."+ pathname + "/" + "handler.js");
									controller.handleRequest(request, response, data);
								}
								else {
									response.end();
								}
							})
						})
					}
				})
			}
		})
	};
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}
		
exports.start = start;
start();
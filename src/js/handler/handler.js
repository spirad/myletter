var fs = require('fs');
var mustache = require('mustache');
var HashMap = require('./hashmap.js');
var process = require('child_process');
console.log("creating Hashmap Object " );
var myValues = new HashMap();

function sayHello() {
	console.log("handler called");
}

function loadTemplate(template) {
    return fs.readFileSync(template).toString();
}

function performTexTranformation(outputDirectory, dataObj) {
	
	var mkdirSync = function (path) {
		  try {
		    fs.mkdirSync(path);
		  } catch(e) {
		    if ( e.code != 'EEXIST' ) throw e;
		  }
	};
	
	
	mkdirSync("gen");
	mkdirSync(outputDirectory);
	var template = loadTemplate("template/stdBriefWS.tmpl");
	var transformedText=mustache.render(template,dataObj);
	fs.writeFileSync(outputDirectory+"/out.tex",transformedText); 
	return outputDirectory + "/out.tex";
	
}

function handleRequest(request, response, data) {
	if (request.method == "GET" ) {
		//response.writeHead(200, {'Content-Type': 'text/html'});
		//fs.createReadStream(__dirname + '/properties2.html').pipe(response);
		console.log("sending back JSON: " + JSON.stringify(myProperties));
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.write(JSON.stringify(myValues));	
		response.end();
	}
	if (request.method == "POST" ) {
		var shortId = require('shortid');
		var generationId = shortId.generate();
		var outputDirectory = "gen/"+generationId;
		console.log("generationId: "+ generationId);
		
		//var test = new Animal(3);
		//var dataObj = JSON.parse(data);
		//console.log("id is" + dataObj["id"]);
		var myObj=JSON.parse(data);
		//console.log("my myObj: %o", myObj);
		//console.log("my object: %o", data);
		//console.log("id is " + myObj.id);
		myValues.setItem(myObj.id, myObj);
		myValues.commit();
		var texFile=performTexTranformation(outputDirectory,myObj);
		//var template = loadTemplate("template/stdBriefWS.tmpl");
		//console.log("template: " + template);
		//var transformedText=mustache.render(template,myObj);
		//fs.writeFileSync("outWS.tex",transformedText); 
		//console.log("transformed: " + transformedText);
		//response.writeHead(200, {'Content-Type': 'text/html'});
		//fs.createReadStream(__dirname + '/inprogress.html').pipe(response);
		var dviFile = require('path').dirname(texFile) + require('path').basename(texFile) + "dvi"	
		console.log("Process: "+"latex "+texFile );
		var ls = process.exec('latex -output-directory='+outputDirectory+" "+texFile, function (error, stdout, stderr) {
		   	if (error) {
			    	console.log(error.stack);
			     	console.log('Error code: '+error.code);
			     	console.log('Signal received: '+error.signal);
			 }
			 else {
		   		console.log('stdout: ' + stdout);
		   		console.log('stderr: ' + stderr);
				var ls2 = process.exec('dvipng outWS.dvi ', function (error, stdout, stderr) {
		   			if (error) {
				    		console.log(error.stack);
				     		console.log('Error code: '+error.code);
				     		console.log('Signal received: '+error.signal);
				 	}
				});
				response.writeHead(200, {'Content-Type': 'text/html'});
				fs.createReadStream(__dirname + '/inprogress.html').pipe(response);
			}
		   	console.log('stdout: ' + stdout);
		   	console.log('stderr: ' + stderr);

	 	});
	
	 	ls.on('exit', function (code) {
	   		console.log('Child process exited with exit code '+code);
	 	});
	}
	
}

exports.handleRequest = handleRequest;
exports.sayHello = sayHello;


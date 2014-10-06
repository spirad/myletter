var fs = require('fs');
var HashMap = require('./hashmap.js');
console.log("creating Hashmap Object " );
var myValues = new HashMap();

function sayHello() {
	console.log("handler called");
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
		//console.log("controller manages: "+ data);
		
		//var test = new Animal(3);
		//var dataObj = JSON.parse(data);
		//console.log("id is" + dataObj["id"]);
		var myObj=JSON.parse(data);
		//console.log("my myObj: %o", myObj);
		//console.log("my object: %o", data);
		//console.log("id is " + myObj.id);
		myValues.setItem(myObj.id, myObj);
		myValues.commit();	
	}
	
}

exports.handleRequest = handleRequest;

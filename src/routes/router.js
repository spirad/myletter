
/*
 * GET home page.
 */

/* exports.index = function(req, res){
  res.render('index', { title: 'Express' })
}; */

var fs = require('fs');
var server_path="../js/handler";

module.exports.myletterGet = function(req, res) {
    var pathname = "../js/handler";
    console.log("instantiating " + "."+  + pathname + "/" + "handler.js");
    var handler = require(server_path + "/" + "handler.js");
    handler.sayHello();
    res.end();
   // handler.handleRequest(req, res, data);
    
};

module.exports.myletterPost = function(req, res) {
    var pathname = "../js/handler";
    console.log("instantiating " + "."+  + pathname + "/" + "handler.js");
    var handler = require(pathname + "/" + "handler.js");
    handler.sayHello();
    res.end();
    handler.handleRequest(req, res, req.body);
};

module.exports.login = function(req, res) {
    if (req.session.user) {
	res.redirect('/restricted');
    }/* else if (req.session.error) {
	res += '<h2>'+req.session.error +'</h2>';
    }*/
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('static/login.html').pipe(res);
}

module.exports.loginUser = function(req, res) {
    console.log("user logon called");
    console.dir(req.session);
    var user= {name:req.body.username, password:"test"};
    console.dir(user);
    if (user.password === req.body.password.toString()) {
	req.session.regenerate(function() {
	    req.session.user = user;
	    req.session.success = "Logged in as "+user.name;
	    res.redirect('./restricted');
	});
    } else  {
	req.session.regenerate(function() {
	    req.session.error = "Log in failed.";
	    res.redirect('./restricted');
	});
	res.redirect("./login");
    }
    	
}

module.exports.logout = function(req, res) {
    req.session.destroy(function() {
	res.redirect('./login');
    });
}

module.exports.restricted = function(req, res) {
    if (req.session.user) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	fs.createReadStream('static/index.html').pipe(res);
    } else {
	req.session.error = "not logged in.";
	res.redirect("/login");
    }
}

module.exports.checkPermission = function(req, res,next) {
    console.log("checking if User is logged on")
    if (!req.session.user) {
	console.log("URL of request: "+req.url)
	console.log("user not logged on")
	var response = "window.alert(\"not logged on\")";
	res.send(response);
	//res.redirect("/login");
	req.session.error = "not logged in.";
	//res.redirect("/login");
	//res.writeHead(200, {'Content-Type': 'text/html'});
	//fs.createReadStream('static/login.html').pipe(res);
    } 
    //next();
}

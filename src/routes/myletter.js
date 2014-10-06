
/*
 * GET home page.
 */

/* exports.index = function(req, res){
  res.render('index', { title: 'Express' })
}; */

//var fs = require('fs');

module.exports.myletter = module.exports.index = function(req, res) {
    fs.readFile('index.html', function(err, page) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(page);
        res.end();
    });
};


/*
function(req, res) {
    var pathname = "myletter";
    console.log("instantiating " + "."+  + pathname + "/" + "handler.js");
    var handler = require("."+ pathname + "/" + "handler.js");
    handler.sayHello();
    res.end();
    //controller.handleRequest(req, res, data);
    
};*/

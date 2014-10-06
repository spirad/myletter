// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 		        // define our app using express
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var crypto = require('crypto');
var routes = require('./routes/router.js');

//Configuration
var port = process.env.PORT || 3000; 		// set our port

//routing static files
app.use('/', express.static('./static'));
app.use('/images', express.static('./images'));
app.use('/js', express.static('./js'));
app.use('/css', express.static('./css'));


//midedleware
app.use(bodyParser());
app.use(cookieParser('Dirk'));
app.use(session());

//logon
app.get('/login', routes.login)
app.post('/login', routes.loginUser)
app.get('/logout', routes.logout)
app.get('/restricted', routes.restricted)

//permission
app.use(routes.checkPermission);

//handling teamplate requests
app.get('/myletter', routes.myletterGet);
app.post('/myletter', routes.myletterPost);





app.listen(port);
console.log('Server listening on port ' + port);
	

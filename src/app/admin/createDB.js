var MongoClient = require('mongodb').MongoClient
//var mongoose = require('mongoose');
var configDB = require('../../config/database.js');
MongoClient.connect(configDB.url, function(err,db) {
	var adminDB=db.admin();
	adminDB.listDatabases(function(err,databases) {
		console.log(databases);
	});

	var dbase = db.db(configDB.db);
	dbase.createCollection("users", function(err,collection) {
		if(!err) {
			console.log("Database and Users Colleciotn created");
		}
		else {
			console.log("error creating Database");
		}
	});
	dbase.close();

});	
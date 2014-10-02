/**
 * New node file
 */

var fs = require('fs');
var events = require('events');
//var EventEmitter = require("events").EventEmitter;
var util = require("util");



function Converter() {
	//util.inherits(Converter, EventEmitter);
	events.EventEmitter.call(this);
	//util.inherits(Converter, EventEmitter);
	
	this.outFile = "out";
	
	var _successor;
	
	this.setSuccessor = function(successor) {
		_successor = successor;
	};
	
	this.getSuccessor = function() {
		return _successor;
	};
	
	this.convert = function (inFile) {
		//var ee = new EventEmitter();
		console.log("in:" +inFile);
		outFile = inFile + "_2txt";
		console.log("out:" +outFile);
		
		var converter = this;
		fs.readFile(inFile, function(err, data) {
			if (err) throw err;
			data = data + "\nNew Line added by TestConverter2";
			fs.appendFile(outFile,data, function() {
				//emitter.emit("converted");
				converter.emit('converted');
			}); 
		});
		
	};
	
	
	this.version = function() {
		console.log("TestConverter2 Version: 0.2");
	};
	
	this.getOutFileName = function() {
		return outFile;
	};
}


Converter.prototype.__proto__ =  events.EventEmitter.prototype;


//Converter.prototype.convert=function (inFile,outFile) {
//	console.log("in:" +inFile);
//	console.log("out:" +outFile);
//	
//	fs.readFile(inFile, function(err, data) {
//		if (err) throw err;
//		data = data + "\nNew Line added";
//		fs.appendFile(outFile,data, function() {
//			//emitter.emit("converted");
//			this.emit("converted"); 
//		}); 
//	});
//	
//};


//exports  = TestConverter;
//exports.version=version;
//exports.convert=convert;
module.exports = Converter;
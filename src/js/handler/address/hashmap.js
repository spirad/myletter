//Module to provide HashMap

var fs = require('fs');
//var propList = new Array();

var method = HashMap.prototype;
var persistFile = __dirname + "/HashMap.json";

function HashMap(obj) {
    this.length = 0;
    this.items = {};
	if (fs.existsSync(persistFile)) {
		console.log("loading persisted data " );
		var props = require(persistFile);
		this.length = props.length;
		this.items = props.items;
	}
	for (var p in obj) {
		if (obj.hasOwnProperty(p)) {
			this.items[p] = obj[p];
			this.length++;
		}
	}
}

 method.setItem = function(key, value) {
	var previous = undefined;
	if (this.hasItem(key)) {
		previous = this.items[key];
	}
	else {
		this.length++;
	}
	this.items[key] = value;
	return previous;
}

method.getItem = function(key) {
	return this.hasItem(key) ? this.items[key] : undefined;
}

method.hasItem = function(key) {
	return this.items.hasOwnProperty(key);
}

method.removeItem = function(key) {
	if (this.hasItem(key)) {
		previous = this.items[key];
		this.length--;
		delete this.items[key];
		return previous;
	}
	else {
		return undefined;
	}
}

method.keys = function() {
	var keys = [];
	for (var k in this.items) {
		if (this.hasItem(k)) {
			keys.push(k);
		}
	}
	return keys;
}

method.values = function() {
	var values = [];
	for (var k in this.items) {
		if (this.hasItem(k)) {
			values.push(this.items[k]);
		}
	}
	return values;
}

method.each = function(fn) {
	for (var k in this.items) {
		if (this.hasItem(k)) {
			fn(k, this.items[k]);
		}
	}
}

method.clear = function() {
	this.items = {}
	this.length = 0;
}

method.commit = function() {
	var propString=JSON.stringify(this);
	console.log("controller stores: " +  propString);
	fs.writeFileSync(persistFile, propString, "utf-8");
}

module.exports  = HashMap;


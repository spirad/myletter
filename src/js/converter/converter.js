/**
 * Converter does a transformation from a source file format to an outpuf format
 */
var fs = require('fs');
var mustache = require('mustache');

function Converter(template,outputDirectory, dataObj, converters) {
	this.template = template;
	this.outputDirectory = outputDirectory;
	this.dataObj = dataObj;
	this.converters = converters;
	this.texFile = "";
	
	this.dump = function() {
		console.dir(this);
	}
	
	this._loadTemplate = function(template) {
	    return fs.readFileSync(template).toString();
	}
	
	this.renderTemplate = function() {
		var templFile = this._loadTemplate(this.template);
		var transformedText=mustache.render(templFile,this.dataObj);
		this.texFile = outputDirectory+"/out.tex";
		this._mkdirSync(outputDirectory);
		fs.writeFileSync(this.texFile,transformedText); 
	}
	
	this.convert = function(myConverter, i) {
		var inFile = this.texFile;
		var j=i;
		if (j>0) inFile = outputDirectory+"/"+j.toString();
		console.log("Converter Module: "+this.converters[i]);
		console.log("loading "+'./'+this.converters[i]+".js");		
		j++;
		var outFile = outputDirectory+"/"+j.toString();
		myConverter.convert(inFile,outFile);
		//var nextConverter = this.converters[i++];
		//var converterNext = this.convert();
		myConverter.on("converted",function(){
			//i++;
			console.log("converted event received.");
			if (nextConverter != null) {
				var Converter = require('./'+nextConverter+".js");
				var myConverter = new Converter();
				converterNext(myConverter,i);
			};
		});
	}
	
	this.convertPipe = function() {
		//var modName="";
		//var j = 0; 
		var i =0;
		var inFile = this.texFile;
		//for (var i in this.converters) {
		//console.log("Converter Module: "+this.converters[i]);
		//console.log("loading "+'./'+this.converters[i]+".js");
		var converter = [];
		while (i < this.converters.length) {
			var Converter = require('./'+this.converters[i]+".js");
			console.log("loading "+'./'+this.converters[i]+".js");
			converter[i] = new Converter();
			if (i>0) converter[i-1].setSuccessor(converter[i]);
			console.log("converter " + i + " created");	
			i++;
		}
		//var Converter = require('./'+this.converters[i]+".js");
		//var myConverter = new Converter();
		//i=0;
		converter[0].version("call ");
		//converter[0].convert(inFile);
		console.log("****I: "+i);
		for (var j=0; j<i; j++) {
			console.log("creating on converted event for converter "+j);
			
			converter[j].on("converted",function(){
				console.log("converted event received from: "+j);
				var inFile = this.getOutFileName();
				//i++;
				
				if (this.getSuccessor()) {
					this.getSuccessor().convert(inFile);
				};
			});
		}
		converter[0].convert(inFile);
		
	};
	
	this._mkdirSync = function (path) {
		  try {
		    fs.mkdirSync(path);
		  } catch(e) {
		    if ( e.code != 'EEXIST' ) throw e;
		  }
	};
	
	this.run = function() {
		this.renderTemplate();
		this.convertPipe();
	};
	
}

var template="template/stdBriefWS.tmpl";
var shortId = require('shortid');
var generationId = shortId.generate();
var outputDirectory = "test/"+generationId;
var myDataObj=  {"id":"asdfsdafa",
				"sender":{"lastName":"Mustermann","firstName":"Manni","street":"Am Ballermann 8","plz":"13131","location":"Musterheim"},
				"receiver":{"lastName":"Bollermann","firstName":"Bertha","street":"AM roten Licht 8",
					"plz":"14144","location":"Bummelburg"},
					"topic":"Jau!","text":"Jau Mensch!\n\nQuatsch"};

converters = ["TestConverter","TestConverter2","TestConverter","TestConverter2",];
var testConverter = new Converter(template,outputDirectory, myDataObj, converters);
testConverter.dump();
testConverter.run();



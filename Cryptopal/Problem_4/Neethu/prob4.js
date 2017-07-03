/**************
*
* Requirements : Node , split (package)	
*
*
* Usage : node prob4
*
*
*
***********/

/*****
*
* 	Async node coming up :) 
*
*****/

var split = require('split')						// to split input into lines
var Transform = require("stream").Transform 		
var util = require('util');
var fs = require('fs');
var xor_analysis = require('./helper.js')

/*= (doing it the node way!) inheriting from Transform */
util.inherits(ProcessStream, Transform)
util.inherits(OutputStream, Transform)

file = fs.createReadStream('./input.txt')			// read from file using file system

file.pipe(split())									// split input
	.pipe(new ProcessStream())						// process each line
	.pipe(new OutputStream())						// process each output
	.pipe(process.stdout)							// direct output to screen


/*= ProcessStream constructor */
function ProcessStream(){
	Transform.call(this, {'objectMode': true})
	this.line= 0;
}

/*= OutputStream constructor */
function OutputStream(){
	Transform.call(this, {'objectMode': true})
}

/*= processing each line */
ProcessStream.prototype._transform = function(line, encoding, processed){
	var object = xor_analysis(line)
	this.line +=1;

	// console.log(this.line, object.score)
	if(object.score>0){	
		this.push({
			'line': line,
			'line_number': this.line,
			'info':object,
		})
	}
	processed()  
}

/*= create output string */
OutputStream.prototype._transform = function(object, encoding, processed){
	output = [];

	output.push("Secret: \n" + object.info.secret)
	output.push("Key: \n" + object.info.key)
	output.push("Line no: \n" + object.line_number+'\n')

	this.push(output.join('\n'))
	processed();
}
/***
*
*	requirements : node, split, stream
*
*	usage: node script.js
****/

var fs = require('fs');			//file system
var split_stream = require('split');		// to split input into lines
var Transform = require('stream').Transform;	// the readable and writable stream
var util = require('util');				// utilities

/*= inheritance */
util.inherits(ProcessLine, Transform);			
util.inherits(EvaluateResult, Transform);

var file = fs.createReadStream('./input.txt'); // input from input.txt

var data = []

file.on('error', function(){
	console.log('err');
})
// console.log(Transform.super_.super_.super_.super_.init())

console.log("It'll take a few mins ...")

/*= piping diffrent streams */
file.pipe(split_stream()).pipe(new ProcessLine).pipe(new EvaluateResult).on('finish', function(){
	var sorted = data.sort(function(a,b){								// sorting the data in descending
		return b[1] - a[1];
	})
	var str = '';
	str += 'The line encoded with ecb is : line no '+ sorted[0][0];
	str += '\ntop 10 finalist lines :\n[<line_no>, <eligibility>]\n';
	str += sorted.slice(0,10).join('\n');
	fs.writeFile('./output.txt', str, function(){						//	write into output.txt
		console.log(str);
	})
})

/* basic function declarations*/
function ProcessLine(){
	Transform.call(this, {'objectMode':true}) //calling parent constructor
	this.line = 0;
}
function EvaluateResult(){
	Transform.call(this, {'objectMode':true})
}

/*= find hamming distance between text at diffrent offsets and lengths between each block of a string*/
ProcessLine.prototype._transform = function(line, encoding, processed){
	var blocks = line.split_string(32);					// getting into blocks of length 32 hex
	var distances = [];
	
	for(var i=0; i<blocks.length-1; i++){
		for(var j=i+1; j< blocks.length; j++){
			var len = 3;
			var array =[];
			for(; len<33;len++){
				for(var k = 0; k< 32 - len; k++){
					array.push(hamming_distance(blocks[i].slice(i, i+len), blocks[j].slice(i, i+len)))
				}

			}
			distances.push(array)
		}

	}
	this.line++;
	this.push({line: this.line, info: distances});		//sending data to the next stream
	
	processed();
}

/*= eligibility criteria is the total number of zero hamming distances . (In ecb mode , same text produces same cipher. So, assuming repetion in text, ecb should produce a high number of zeros) */
EvaluateResult.prototype._transform = function(object, encoding, processed){
	var count_zeros = 0;
	object.info.forEach(function(row){
		row.forEach(function(ele){
			if(ele==0)count_zeros++;
		})
	})
	data.push([object.line,count_zeros]);
	processed()
}


/*= split string to blocks of specified length */
String.prototype.split_string = function(size){
    var regex = new RegExp("(.|[\r\n]){1,"+size+"}",'g');
    return this.match(regex);
}

/*= pad zero in the front*/
function zero_pad(string, length){
    if(string.length>=length){
        return string;
    }
    return zero_pad('0'+string, length)
}

/*= function to find hamming distance */
function hamming_distance(hex1, hex2){
	var xor = xor_hex(hex1, hex2)
	
	count = 0;
	xor.split('').forEach(function(ele){
		if(parseInt(ele))count++;
	})
	return count;
}

/*= xor hex strings*/
function xor_hex(hex1, hex2){
	if(hex1.length != hex2.length){
		console.log('strings should be of the same length')
		return
	}
	var xor_bin = ''
	hex1.split('').forEach(function(ele, ind){
		xor_bin += zero_pad((parseInt(ele, 16)^parseInt(hex2[ind])).toString(2),4)
	})
	return xor_bin;

}

// console.log(hamming_distance('f0','f1'))


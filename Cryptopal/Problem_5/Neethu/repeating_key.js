/*******
*
*
*	Requirements: Node , concat (package)
*
*	Usage: node repeating_key.js
*
**********/

var fs = require("fs")							//file system
var concat = require('concat-stream')			// concat stream

var helper = require("../../Problem_3/Neethu/helper.js")	

var key_letters = "ICE".split('')		


file = fs.createReadStream('./input.txt')				// taking input

file.on('error', function(){							// error handling
	console.log("Couldn't read from input.txt. Make sure it exists")
})

file.pipe(concat(function(buff){						//read full input as buffer
	line = buff.toString()								
				
	var key = string_to_hex(findkey(line))				//find key
	var hex_string = string_to_hex(line)
	
	var output = helper.xor(key, hex_string, "hex"); 	// xor! 
	console.log(output.toString(16))				
}))

/*= findkey for any text */
function findkey(line){
	var key = ""
	var len = line.length;
	var rem = len % key_letters.length;
	var mul = Math.floor(len / key_letters.length);
	var i = 0;
	while(mul){
		key += key_letters.join('');
		mul--;
	}
	for(var k = 0; k< rem; k++){
		key += key_letters[k]
	}
	
	return key
}

/*= ascii to hex string */
function string_to_hex(string){

	return string.toString().split('').map(function(ele){
		return ("0" + ele.charCodeAt(0).toString(16)).slice(-2);
	}).join("");

}
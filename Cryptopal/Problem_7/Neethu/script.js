/*******
*
* requirements : Node, concat(package)
*
* usage : node script.js
*******/


var fs = require('fs');				// the node file sys
var concat = require('concat-stream');	// to get all the input as one stream
var tools = require('./tools');			// my lib :D
var Matrix = tools.Matrix;				// my lib's matrix constructor

let key = (new Buffer("YELLOW SUBMARINE")).toString('hex'); 	// my fav key
// let key = '000102030405060708090a0b0c0d0e0f'

var file = fs.createReadStream('./input.txt');				// taking input

file.on('error',function(){									// standard error handling
	console.log('could not read from file')
})

file.pipe(concat(process_input))					// process input

function process_input(buffer){	
	var input = new Buffer(buffer.toString(), 'base64');  				
	
	var input_hex = input.toString('hex');			// converting input into hex
	
	
	var output_hex = decrypt(input_hex, key);		// decrypt!
	handle_output(output_hex);						
}

function handle_output(hex){
	var output = (new Buffer(hex, 'hex')).toString('utf-8');	// converting hex to ascii
	console.log('\n \n \n output :',output);
	fs.writeFile("./output.txt", output, function(err) {		// saving output in output.txt
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	});
	
}

function decrypt_block(block, keys){
	
	var state = tools.add_round_key(block, keys[10]);			// xor round key (use last key first)
	
	for(var i = 0; i<9; i++){
		state = tools.inverse_substitute_bytes(state);			// inverse substitute and
		state = tools.inverse_shift_rows(state);				// inverse shift rows ( they commute )
		
		state = tools.inverse_mix_columns(state);				// inverse mix columns

		state = tools.add_round_key(state, keys[9 - i]);		//xor next round key
		
	}

	state = tools.inverse_shift_rows(state);					// last round without inverse mix columns
	state = tools.inverse_substitute_bytes(state);				
	
	state = tools.add_round_key(state,keys[0]);					// add last round key
	return state
	
}

function decrypt(hex_string, key){
	
	var blocks = tools.split_string(hex_string,32);				//convert string into blocks with 32 hex digits each
	
	var decrypted_hex = ""
	var key_matrix = new Matrix(key, 4, 4);						// loading key into matrix constructor for col major 2d matrix implementation
	var keys = tools.inverse_key_expansion(key_matrix);			//	inverse key expansion (normal key expansion + inverse mix cols on all keys except first and last)
	// keys.forEach(function(ele, ind){
	// 	console.log(tools.split_string(ele.toString(), 2).join(' '))
	// })
	for(var i = 0; i< blocks.length; i++){
		block_matrix = new Matrix(blocks[i], 4, 4);				// loading block into col major 2d matrix 
		console.log('block no: ',i)
		console.log(blocks[i].length)
		
		decrypted_hex += decrypt_block(block_matrix, keys).toString();		// decrypt each block ( ecb mode ) 
		
	}
	return decrypted_hex;
	
}




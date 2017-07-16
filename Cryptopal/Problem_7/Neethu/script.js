var fs = require('fs');
var concat = require('concat-stream');
var tools = require('./tools');
var Matrix = tools.Matrix;

let key = (new Buffer("YELLOW SUBMARINE")).toString('hex');
// let key = '000102030405060708090a0b0c0d0e0f'

var file = fs.createReadStream('./input.txt');

file.on('error',function(){
	console.log('could not read from file')
})

file.pipe(concat(process_input))

function process_input(buffer){
	var input = new Buffer(buffer.toString(), 'base64');  				
	
	var input_hex = input.toString('hex');
	// input_hex = buffer.toString();
	
	var output_hex = decrypt(input_hex, key);
	handle_output(output_hex);
}

function handle_output(hex){
	var output = (new Buffer(hex, 'hex')).toString('utf-8');
	console.log('\n \n \n output :',output);
	fs.writeFile("./output.txt", output, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	});
	// console.log(hex)
}

function decrypt_block(block, keys){
	//console.log(key)
	
	//console.log(block)
	//console.log('block length: ',block.toString().length)

	var state = tools.add_round_key(block, keys[10]);
	// console.log(tools.split_string(state.toString(),2).join(' '))
	// console.log('state length: ',state.toString().length)
	for(var i = 0; i<9; i++){
		state = tools.inverse_substitute_bytes(state);
		// console.log(tools.split_string(state.toString(),2).join(' '))
		//console.log('state length: ',state.toString().length)
		//console.log('2342')
		// console.log(keys[9-i])
		//console.log(state.toString().length)

		state = tools.inverse_shift_rows(state);
		// console.log(tools.split_string(state.toString(),2).join(' '))
		//console.log('state length: ',state.toString().length)
		//console.log('555')
		state = tools.inverse_mix_columns(state);
		// console.log(tools.split_string(state.toString(),2).join(' '))
		//console.log('state length: ',state.toString().length)
		//console.log('444', i)

		
		state = tools.add_round_key(state, keys[9 - i]);
		//console.log(tools.split_string(state.toString(),2).join(' '))
		//console.log('state length: ',state.toString().length)
		//console.log(state)
		//console.log('fdfsd')
	}

	state = tools.inverse_shift_rows(state);
	//console.log('5764')
	state = tools.inverse_substitute_bytes(state);
	//console.log('999')
	state = tools.add_round_key(state,keys[0]);
	return state
	
}

function decrypt(hex_string, key){
	
	var blocks = tools.split_string(hex_string,32);
	
	var decrypted_hex = ""
	var key_matrix = new Matrix(key, 4, 4);
	var keys = tools.inverse_key_expansion(key_matrix);
	// keys.forEach(function(ele, ind){
	// 	console.log(tools.split_string(ele.toString(), 2).join(' '))
	// })
	for(var i = 0; i< blocks.length; i++){
		block_matrix = new Matrix(blocks[i], 4, 4);
		console.log('block no: ',i)
		console.log(blocks[i].length)
		// console.log(block_matrix)
		decrypted_hex += decrypt_block(block_matrix, keys).toString();
		//console.log(decrypt_block(block_matrix, keys).toString())
	}
	return decrypted_hex;
	
}




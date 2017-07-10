/*******
*
*
* requirements : Node, atob, concat-stream
*
* usage: node script.js 
*
*******/


var fs = require('fs');
var concat = require('concat-stream');
var atob = require('atob');
var helper3 = require('../../Problem_3/Neethu/helper.js')
var xor_analysis = require('../../Problem_4/Neethu/helper.js')


var file = fs.createReadStream('./input.txt');

file.on('error', function(){
	console.log('Error on reading file input.txt ');
})



file.pipe(concat(function(buff){							// open file and concat lines
	lines = buff.toString();
	ascii_lines = atob(lines);								// decode lines into ascii
	
	var i = 2, info_key = [];
	for(; i< 41; i++){
		info_key.push(eval_keysize(i,ascii_lines));			// evalute hamming distance for each keysize
	}

	info_key.sort(function(a,b){							//sort based on hamming distance
		return a.ham - b.ham;
	})
	// console.log(info_key)

	top_key_sizes = [info_key[0]['size'],info_key[1]['size'], info_key[2]['size']];		//choose top 3

	var key 
	for(var i = 0; i< top_key_sizes.length; i++){					
		var k = find_key(top_key_sizes[i], ascii_lines);		// find key for the chosen lengths
		if(k)
			key = k
	}


	var text_decrypted = decrypt(key, ascii_lines);
	let str = "The key is : " + key +'\n'+'Decrypted text: \n'+ text_decrypted;

	fs.writeFile('./output.txt', str, function(err){		// save output in output.txt
		if(err)return console.log(err);
		console.log('check output.txt')
	})
}))

/*= find hamming distance by counting the number of 1s in the xor of two stirngs */
function hamming_distance(a, b){
	hex1 = ascii_hex(a);
	hex2 = ascii_hex(b);
	bin = helper3.xor(hex1,hex2, "binary")
	return bin.split('').filter(function(e){
		return parseInt(e) == 1;
	}).length;

}

// console.log(hamming_distance('this is a test', 'wokka wokka!!!')) 
// --> 37


/*= convert ascii into hex*/
function ascii_hex(a){
	return a.toString().split('').map(function(e){
		return ('0' + e.charCodeAt(0).toString(16)).slice(-2);
	}).join('');
}


/*= find average hamming distance of 15 pairs of texts and normalise */
function eval_keysize(size, text){
	var elements = split_text(size, text).slice(0,30); 
	ham_dist = [];
	for(var i = 0; i<30; i+=2){
		ham_dist.push(hamming_distance(elements[i], elements[i+1]))
	}
	var total = ham_dist.reduce(function(sum, val){
		return sum+val;
	},0)
	
	var avg = total/(ham_dist.length*size);
	return {
		'size': size,
		'ham': avg,
		'1': ham_dist 
	}
}

/*= split string into chuncks of size n using regex */
function split_text(size, text){
	var regex = new RegExp("(.|[\r\n]){1,"+size+"}",'g');
	return text.match(regex);
}

/*= split text into blocks , analyse each block and find key */
function find_key(size, text){

	var blocks = new Array(size).fill("");
	text.split("").map(function(ele, index){
		var rem = index%size;
		blocks[rem] += ele;	
	})
	
	var key = "";
	for(var i =0; i< size; i++){
		var obj = xor_analysis(ascii_hex(blocks[i]))
		var score = obj.score;

		if(score<0)return;
		key += obj.key;
	}

	return key
}

/*= decrypt message , given key */
function decrypt(key, text){
	var long_key = key.repeat(text.length/key.length);
	var rem = text.length % key.length;
	long_key += key.substring(0, rem);

	var decoded_hex = helper3.xor(ascii_hex(long_key), ascii_hex(text))
	return hex_ascii(decoded_hex);
}

/*= hex to ascii */
function hex_ascii(hex_string){
	return split_text(2,hex_string).reduce(function(string, ele){
		return string + String.fromCharCode(parseInt(ele, 16))
	},"")

}


/********
*
*
*	helper functions to find xor of each line and do the analysis
*
*
********/


module.exports = xor_analysis;


var most_frequent_chars = "e a r i o t".split(" ");		// according to wikipedia

function xor_analysis(cipher){
	
	
	var decipher = {};				// holds info about key ,it's string and it's score


	/*= deciphering text and finding scores */

	for(var i = 32; i< 127; i++){	// all readable keys in decimal

		var key_unit = decimal_encode_hex(i);	
		var key = "";
		var len_key_unit = key_unit.length;
		
		for(var j = 0; j< cipher.length; j+=len_key_unit){			//constructing key of required length in hex
			
			key = key + key_unit;
		};
		decipher[key_unit] = {};									// each key has an object (wow...)
		
		decipher[key_unit]['string'] = binary_to_ascii(xor_hex(cipher,key,"binary"));	// xor -ed and converted into ascii
		decipher[key_unit]['top_letters'] = most_frequent(decipher[key_unit]['string']);						//array of top five or lesser letters
 		decipher[key_unit]['score'] = score_frequency(decipher[key_unit]['top_letters']);					// finding score
 		// console.log(decipher[key_unit]['string'], decipher[key_unit]['score'], decipher[key_unit]['string'].length)
	}

	/*=  finding the text with highest score */

	var sorting  = [];									// since arrays can be sorted , change object into 2d array
 	for(key in decipher){
 		var score =  decipher[key]['score'].toString()
 		var ele = [key, decipher[key]['string'], score];
 
 		sorting.push(ele);
 	}
 	
 	sorting.sort(function(a, b){						// Sort it according to 3rd row
 		return Number(b[2]) - Number(a[2]);
 	})

 	/*= yay .. my results */

 	return {
 		'secret': sorting[0][1],
 		'key': String.fromCharCode(parseInt(sorting[0][0],16)),
 		'score': parseInt(sorting[0][2]),
 	}
}


/*= score out of 5 based on number of charectors that fall in most_frequent_chars array */
function score_frequency(array){

	var score = 0;
	for(i in array){
		special_chars = "! , . ? : ; ' #".split(" ")
		special_chars.push(" ");
		special_chars.push('"');
		special_chars.push("\"")
		if((array[i].charCodeAt(0)<"a".charCodeAt(0) || array[i].charCodeAt(0)>"z".charCodeAt(0) )&& special_chars.indexOf(array[i]) == -1 )
		{	
			score-=1;
		}
		
		if(most_frequent_chars.indexOf(array[i]) > -1){
			score+=1;
		}
	}
	return score;
}



/*= return array of top 5 most frequent charectors */
function most_frequent(string){

	var char_array = string.toLowerCase().split('');
	var len = char_array.length;
	if( len == 0){
		return;
	}
	var fraction = 1/len;
	var object = {}
	/*= filling object with score for each char */
	for(i in char_array){
		
		if(object[char_array[i]]){
			object[char_array[i]]+=fraction;
		}else{
			object[char_array[i]] = fraction;
		}
	}



	/*= sorting top 5 charectors */
	var array = []
	for(ele in object){
		array.push([ele, object.ele])
	}

	array.sort(function(a,b){return b[1]-a[1]});

	var top = [];
	for(var i = 0; i<5 || i<array.length; i++){		
		top.push(array[i][0])
	}	
	return top;
}

/*= convert binarystrings into ascii */
function binary_to_ascii(binary_string){
	var result = "";
	
	/*= length checking */
	if(binary_string.length%8 != 0 )
		binary_string = zero_padding(binary_string, 8 - binary_string.length%8 + binary_string.length)
	

	for(var i=0; i<binary_string.length; i+=8){
		binary_unit = binary_string.slice(i, i+8);
		text = parseInt(binary_unit, 2)
		result = result + String.fromCharCode(text);
	}
	
	return result;
}






/*= to find xor of hex1 and hex2. specify format as "binary" or "hex" , default: hex*/
function xor_hex(hex1, hex2, format){
	var hex_array = [hex1, hex2];

	/*= input sanitisation */

	if(hex_array[0] == null || hex_array[1] == null){
		console.log("2 hex inputs required!")
		return;
	}
	if(hex_array[1].length != hex_array[0].length){
		console.log("hex strings should have the same length :P");
		return;
	}

	/*= XOR operation*/

	var binary_array = hex_array.map(function(ele, index){
		return hex_decode_binary(ele)
	});

	var result = "";
	for(var i = 0; i < binary_array[0].length ; i++){					//XOR each byte and append to result
		
		var value = (+(binary_array[0][i]))^(+(binary_array[1][i])).toString();
		
		result = result + value; 														
	}
	if(format=="binary"){
		return result;
	}
	

	// console.log(typeof result)
	var result_in_hex = binary_encode_hex(result)									
	return result_in_hex;
	
}

function decimal_encode_hex(decimal){
	decimal = +decimal;					//input sanitisation
	
	var binary_string = decimal_compute_binary(decimal).toString(2)
	if(binary_string.length%4 != 0){
		binary_string = zero_padding(binary_string,4 - (binary_string.length%4)+binary_string.length)
	}
	return binary_encode_hex(binary_string);
}

function hex_decode_binary(hex_string){
	hex_string = hex_string + ""											// INPUT SANitiazation
	var binary_string = "";

	/*== iterate through hex string and find binary equivalent string */
	for(var i = 0; i<hex_string.length; i++){

		var decimal = hex_digit_decode_decimal(hex_string[i]); 				// find decimal for each hex
		
		var binary = decimal_compute_binary(decimal);						//find binary for each decimal
		var zero_padded_binary = zero_padding(binary, 4);					//make it 4 bytes long
		
		binary_string = binary_string + zero_padded_binary;					//store binary in a string
	}
	return binary_string;
}

function binary_encode_hex(binary_string){
	var hex_string = ""

	for(var i = 0; i<binary_string.length; i+=4){
		var binary_unit = +(binary_string.slice(i, i+4));  					//extract 4 binary digits
	
		
		var decimal = binary_compute_decimal(binary_unit,0); 				//find decimal equivalent 
		
		var hex_unit = decimal_unit_encode_hex(decimal);  						// find hex equivalent 
		hex_string = hex_string + hex_unit;									// store in a string
	}

	return hex_string;
}



/*= decode a digit of hex to decimal */
function hex_digit_decode_decimal(hex_digit_as_string){
	var ascii = hex_digit_as_string.charCodeAt(0); 		

	if(ascii <= "9".charCodeAt(0)){
		return ascii - 48 ;							 	
	}

	return ascii - "a".charCodeAt(0) + 10;
}


/*= compute the binary equivalent from the decimal */
function decimal_compute_binary(decimal){
	if(decimal == 0 || decimal == 1){
		return decimal;
	}
	var value = "" + decimal%2;
	return decimal_compute_binary(Math.floor(decimal/2)) + value;
}




/*= add zeros to the end of binary strings */
function zero_padding(string, length){
	if(string.length >= length){
		return string;
	}

	return zero_padding("0" + string, length); 
}




/*= compute decimal from binary */
function binary_compute_decimal(binary, i){
	if(binary == 1 || binary==0){
		return Math.pow(2,i)*((binary)%10);
	}

	var value = Math.pow(2,i)*((binary)%10) 

	return value + binary_compute_decimal(Math.floor(binary/10), i+1); 
}


/*= encode hex digit from decimal */
function decimal_unit_encode_hex(decimal){
	if(decimal < 10)
		return "" + decimal;
	return String.fromCharCode('a'.charCodeAt(0)+ decimal - 10)
}

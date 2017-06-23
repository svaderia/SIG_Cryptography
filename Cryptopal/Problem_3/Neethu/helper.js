/*********
*
*
*	helper functions to find xor
*	1. Xor 2 hex strings and return string in hex or binary
*	2. encode hex from decimal
*	3. add zero padding to reach a specific length
*
**********/

module.exports = { 
	xor: xor_hex,
	dechex: decimal_encode_hex,
	zeropad: zero_padding
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
		// console.log(typeof result)
		var value = (+(binary_array[0][i]))^(+(binary_array[1][i])).toString();
		// console.log(typeof value)
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
	// console.log(decimal);
	var binary_string = decimal_compute_binary(decimal).toString(2)
	// console.log(binary_string)
	// console.log(binary_string.length%4)
	if(binary_string.length%4 != 0){
		// console.log("!")
		binary_string = zero_padding(binary_string,4 - (binary_string.length%4)+binary_string.length)
	}
	// console.log(binary_string)
	return binary_encode_hex(binary_string);
}

function hex_decode_binary(hex_string){
	hex_string = hex_string + ""											// INPUT SANitiazation
	var binary_string = "";

	/*== iterate through hex string and find binary equivalent string */
	for(var i = 0; i<hex_string.length; i++){

		var decimal = hex_digit_decode_decimal(hex_string[i]); 				// find decimal for each hex
		// console.log(decimal);
		
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
		// console.log('start');
		
		var decimal = binary_compute_decimal(binary_unit,0); 				//find decimal equivalent 
		// console.log('end');
		// console.log(decimal);
		
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
	// console.log(binary)
	// console.log(i)
	var value = Math.pow(2,i)*((binary)%10) 
	// console.log(value);	
	return value + binary_compute_decimal(Math.floor(binary/10), i+1); 
}


/*= encode hex digit from decimal */
function decimal_unit_encode_hex(decimal){
	if(decimal < 10)
		return "" + decimal;
	return String.fromCharCode('a'.charCodeAt(0)+ decimal - 10)
}

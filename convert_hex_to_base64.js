/*****
*
* Requirements: Node 
* 
* Usage: node convert_hex_to_base64 <your_hex_string>  
*
*
******/


var hex = process.argv[2];

function main(){
	var binary_string = "";

	/*== iterate through hex string and find binary equivalent string */
	for(var i = 0; i<hex.length; i++){

		var decimal = hex_digit_decode_decimal(hex[i]); 					// find decimal for each hex
		// console.log(decimal);
		
		var binary = decimal_compute_binary(decimal);						//find binary for each decimal
		var zero_padded_binary = zero_padding(binary, 4);					//make it 4 bytes long
		
		binary_string = binary_string + zero_padded_binary;					//store binary in a string
	}

	// console.log(binary_string)

	var base64_as_string = ""

	for(var i = 0; i<binary_string.length; i+=6){
		var binary_unit = +(binary_string.slice(i, i+6));  					//extract 6 binary digits
		// console.log('start');
		
		var decimal = binary_compute_decimal(binary_unit,0); 				//find decimal equivalent 
		// console.log('end');
		// console.log(decimal);
		
		var base64_unit = decimal_encode_base64(decimal);  					// find base64 equivalent 
		base64_as_string = base64_as_string + base64_unit;					// store in a string
	}

	console.log(base64_as_string);
}



/*** 
*
*	HEAVY RECURSIONS COMING UP!
*
***/

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


/*= encode base64 digit from decimal */
function decimal_encode_base64(decimal){
	if(decimal < 26){
		return String.fromCharCode("A".charCodeAt(0) + decimal);
	}
	if(decimal < 52){
		return String.fromCharCode("a".charCodeAt(0) + decimal - 26);
	}
	if(decimal < 62){
		return (decimal - 52) + "";
	}
	if( decimal == 62){
		return "+";
	}
	return "/";
}



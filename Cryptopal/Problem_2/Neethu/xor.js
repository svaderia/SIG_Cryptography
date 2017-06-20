/*****
*
*	Requirements : Node
*	Usage: node xor.js <hex1> <hex2>
*	
*	hex1 and hex2 should be of equal length
*
*******/

var helpers = require("./helper.js")  								// my module ! yay , no pollution :D

main()

var main = function(){
	var hex_array = [process.argv[2], process.argv[3]]

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
		return helpers.hexbin(ele)
	});

	var result = "";
	for(var i = 0; i < binary_array[0].length ; i++){					//XOR each byte and append to result
		// console.log(typeof result)
		var value = (+(binary_array[0][i]))^(+(binary_array[1][i])).toString();
		// console.log(typeof value)
		result = result + value; 														
	}
	

	// console.log(typeof result)
	var result_in_hex = helpers.binhex(result)									
	console.log(result_in_hex)
	
	return;
}



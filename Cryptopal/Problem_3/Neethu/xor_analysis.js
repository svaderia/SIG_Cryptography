/********
*
*
*	Requirements : Node
*	
*	Usage: node xor_analysis.js <decrypted string>
*	
*	
*	
*
*
*
*********/

helper = require("./helper.js")						// Tada.. my helper !

var most_frequent_chars = "e a r i o t".split(" ");		// according to wikipedia
main();

function main(){
	var cipher = process.argv[2];
	var decipher = {};				// holds info about key ,it's string and it's score


	/*= deciphering text and finding scores */

	for(var i = 33; i< 127; i++){	// all readable keys in decimal

		var key_unit = helper.dechex(i);		
		var key = "";
		var len_key_unit = key_unit.length;
		// console.log("O:)")
		// console.log(cipher.length)
		for(var j = 0; j< cipher.length; j+=len_key_unit){			//constructing key of required length in hex
			// console.log(":P")
			// console.log(j,len_key_unit)
			key = key + key_unit;
		};
		decipher[key_unit] = {};									// each key has an object (wow...)
		// console.log(i)
		// console.log("!")
		// console.log(key)
		decipher[key_unit]['string'] = binary_to_ascii(helper.xor(cipher,key,"binary"));	// xor -ed and converted into ascii
		var top_letters = most_frequent(decipher[key_unit]['string']);						//array of top five or lesser letters
 		decipher[key_unit]['score'] = score_frequency(top_letters);							// finding score

 		// console.log(key_unit, decipher[key_unit]['score'])
 		
	}

	/*=  finding the text with highest score */

	var sorting  = [];									// since arrays can be sorted , change object into 2d array
 	for(key in decipher){
 		var score =  decipher[key]['score'].toString()
 		var ele = [key, decipher[key]['string'], score];
 
 		sorting.push(ele);
 	}
 	// console.log(sorting)
 	sorting.sort(function(a, b){						// Sort it according to 3rd row
 		// console.log(a[0], a[1], a[2])
 		return Number(b[2]) - Number(a[2]);
 	})

 	/*= yay .. my results */

 	console.log("Secret Message: \n",sorting[0][1])
 	console.log("Key: \n",String.fromCharCode(parseInt(sorting[0][0],16)))
}


/*= score out of 5 based on number of charectors that fall in most_frequent_chars array */
function score_frequency(array){

	var score = 0;
	for(i in array){
		if((array[i].charCodeAt(0)<"a".charCodeAt(0) || array[i].charCodeAt(0)>"z".charCodeAt(0)) && array[i]!=" " && array[i]!="!" && array[i]!=","  && array[i]!="."  && array[i]!="'")
		{	
			return 0;
		}
		// console.log(array[i]);
		// console.log(most_frequent_chars);
		if(most_frequent_chars.indexOf(array[i]) > -1){
			score +=1;
		}
	}
	return score;
}



/*= return array of top 5 most frequent charectors */
function most_frequent(string){

	var char_array = string.toLowerCase().split('');
	var len = char_array.length;
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
	// console.log(string)
	// console.log(object)


	/*= sorting top 5 charectors */
	var array = []
	for(ele in object){
		array.push([ele, object.ele])
	}
	// console.log(array)
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
	// console.log(typeof binary_string);

	/*= length checking */
	if(binary_string.length%8 != 0 )
		binary_string = helper.zeropad(binary_string, 8 - binary_string.length%8 + binary_string.length)
	

	for(var i=0; i<binary_string.length; i+=8){
		binary_unit = binary_string.slice(i, i+8);
		text = parseInt(binary_unit, 2)
		result = result + String.fromCharCode(text);
	}
	
	return result;
}


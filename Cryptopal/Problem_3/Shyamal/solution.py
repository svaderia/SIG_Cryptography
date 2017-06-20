#!/usr/bin/env python
# @author = 01010011 01101000 01111001 01100001 01101101 01100001 01101100 
# date	  = 21/06/2017


import codecs

def char_score(arr):
    ch = [x for x in arr if 'a'<=x<='z' or 'A'<=x<='Z']
    return len(ch)/len(arr)
    
def breaking_single_byte_xor(string):
    hex_string = codecs.decode(string,'hex')        
    scores = []
    for i in range(256):
        character_array = [chr(s ^ i) for s in hex_string]
        scores.append(char_score(character_array)) 
    keys = [i for i,j in enumerate(scores) if j == max(scores)]
    return keys

def main():
    a = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'
    print(breaking_single_byte_xor(a))

if __name__ == "__main__":
    main()
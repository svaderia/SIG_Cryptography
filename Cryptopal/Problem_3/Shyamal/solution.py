#!/usr/bin/env python
# @author = 01010011 01101000 01111001 01100001 01101101 01100001 01101100 
# date	  = 21/06/2017


import codecs

freqs = {
    'a': 0.0651738,
    'b': 0.0124248,
    'c': 0.0217339,
    'd': 0.0349835,
    'e': 0.1041442,
    'f': 0.0197881,
    'g': 0.0158610,
    'h': 0.0492888,
    'i': 0.0558094,
    'j': 0.0009033,
    'k': 0.0050529,
    'l': 0.0331490,
    'm': 0.0202124,
    'n': 0.0564513,
    'o': 0.0596302,
    'p': 0.0137645,
    'q': 0.0008606,
    'r': 0.0497563,
    's': 0.0515760,
    't': 0.0729357,
    'u': 0.0225134,
    'v': 0.0082903,
    'w': 0.0171272,
    'x': 0.0013692,
    'y': 0.0145984,
    'z': 0.0007836,
    ' ': 0.1918182 
}

def char_score(arr):
    ch = [freqs[x.lower()] for x in arr if 'a'<=x<='z' or 'A'<=x<='Z' or x == ' ']
    return sum(ch)

def breaking_single_byte_xor(string):
    hex_string = codecs.decode(string,'hex')        
    strings = [(i, ''.join([chr(s ^ i) for s in hex_string])) for i in range(256)]
    def score(p):
        return char_score(p[1])

    return max(strings, key=score)


def main():
    a = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'
    print(breaking_single_byte_xor(a))

if __name__ == "__main__":
    main()
#!/usr/bin/env python3
# @author = 01010011 01101000 01111001 01100001 01101101 01100001 01101100 
# date	  = 20/06/2017


def XOR(string1, string2):
    n1 = int(string1, 16)   # converted string into integer
    n2 = int(string2, 16)
    return hex(n1^n2)[2:]   # hex out puts '0x...' so did [2:], ^ is XOR operator

def main():
    print(XOR(input(), input()))

if __name__ == "__main__":
    main()
#!/usr/bin/env python3
# @author = 01010011 01101000 01111001 01100001 01101101 01100001 01101100 
# date	  = 21/06/2017

import codecs
from problem3 import *

def break_file(filename):
    f = open(filename, 'r')
    brokenLines = [breaking_single_byte_xor(line.strip()) for line in f.readlines()]
    def score(p):
        return char_score(p[1])
    maxI = max(brokenLines, key = score)
    return maxI


def main():
    print(break_file('input.txt'))


if __name__ == "__main__":
    main()

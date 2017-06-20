#!/usr/bin/env python3
# @author = 01010011 01101000 01111001 01100001 01101101 01100001 01101100 
# date	  = 19/06/2017

import codecs

def hex_base64_encode(hex_string):
    string = codecs.decode(hex_string,'hex')
    base64_string = codecs.encode(string, 'base64')
    return base64_string

def hex_base64_decode(base64_string):
    string = codecs.decode(base64_string, 'base64')
    hex_string = codecs.encode(string, 'hex')
    return hex_string
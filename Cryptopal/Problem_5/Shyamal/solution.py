#!/usr/bin/env python3
# @author = 01010011 01101000 01111001 01100001 01101101 01100001 01101100 
# date	  = 24/06/2017


def string_hex(msg):
    arr = [str(hex(ord(i)))[2:] for i in msg]
    arr = [x if len(x)==2 else '0'+x for x in arr]      # O padding
    return arr

def encrypt(msg , key):
    mx = string_hex(msg)
    kx = string_hex(key)
    k = len(kx)
    divided_msg = [mx[i:i+k] for i in range(0,len(mx),k)]
    fin = []
    for ms in divided_msg:
        b = [str(hex(int(a,16) ^ int(b,16)))[2:] for a,b in zip(ms,kx)] 
        arr = [x if len(x)==2 else '0'+x for x in b]
        fin.extend(arr)
    return ''.join(fin) 


def main():
    msg = "Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal"
    key = 'ICE'
    print(encrypt(msg, key))

if __name__ == "__main__":
    main()
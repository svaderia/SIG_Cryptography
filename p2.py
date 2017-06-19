from binascii import hexlify,unhexlify,a2b_hex,b2a_hex 
h1=raw_input("Hex String 1>")
h2=raw_input("Hex String 2>")
s3=str(hex(int(h1,16)^int(h2,16)))
s=s3[2:len(s3)-1]
print s


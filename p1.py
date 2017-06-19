from binascii import a2b_hex,b2a_base64
s=raw_input("Hex String>")
print str(b2a_base64(a2b_hex(s)))

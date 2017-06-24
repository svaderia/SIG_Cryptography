import base64
import binascii

def hextobase64(s):
	raw = binascii.unhexlify(s)
	return base64.b64encode(raw).decode('ascii')

def base64tohex(s):
	raw = base64.b64decode(s)
	return binascii.hexlify(raw)

def hextoraw(s):
	return binascii.unhexlify(s)

def main():
	hex_string = input()
	b64 = hextobase64(hex_string)
	b16 = base64tohex(b64)
	raw = hextoraw(hex_string)

	print(b16)
	print(b64)
	print(raw)

if __name__ == "__main__":
	main()

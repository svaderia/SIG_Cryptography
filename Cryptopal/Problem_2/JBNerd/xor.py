import codecs
import binascii

def xor(a, b):
	c = ""
	for i in range(len(a)):
		c += str(binascii.hexlify(bytes([ a[i] ^ b[i] ]))) #XOR operations are applied on raw bytes.
	c = c.replace("'b'", "") # Cleaning of the resultant string.
	c = c.replace("b'", "")
	c = c.replace("'", "")
	print(c)
	c = codecs.decode(c, 'hex') #To check if the hex form of result has a meaning in raw form.
	print(c)

def main():

	a = binascii.unhexlify('1c0111001f010100061a024b53535009181c')
	a = binascii.hexlify(a)
	b = binascii.unhexlify('686974207468652062756c6c277320657965')
	b = binascii.hexlify(b)
	a = codecs.decode(a, 'hex') #To check if the hex has some meaning in raw form.
	b = codecs.decode(b, 'hex')
	print(a)
	print(b)

	c = xor(a, b)

if __name__ == "__main__":
	main()

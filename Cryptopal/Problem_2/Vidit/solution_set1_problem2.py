while True:
	h1 = input("Enter hex string 1\n")
	h2 = input("Enter hex string 2\n")
	if len(h1)==len(h2):
		break
	else:
		print("Hex strings must be of same length\n")
s1 = bin(int(h1, 16))[2:].zfill(len(h1)*4)
s2 = bin(int(h2, 16))[2:].zfill(len(h2)*4)
s = ''
for i in range(len(h1)*4):
	if s1[i]==s2[i]:
		s = s + '0'
	else:
		s = s + '1'
print(hex(int(s,2))[2:])

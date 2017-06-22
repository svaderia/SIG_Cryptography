string1 = raw_input("enter first string:")
string2 = raw_input("enter second string:")

if len(string1) != len(string2):
    print "enter strings of same length."
    exit()
else:
    print ''.join([hex(int(string1[i], 16) ^ int(string2[i], 16))[2] for i in range(len(string1))])

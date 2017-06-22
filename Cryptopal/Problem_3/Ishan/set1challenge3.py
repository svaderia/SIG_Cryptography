string = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"
encrypted = string.decode("hex").encode("utf-8")
alpha_freq={'a': 8.55, 't':8.94, 'e':12.10}
keys = alpha_freq.keys()


def scoring(decrypt):
    # only checking frequencies for most used characters
    alpha_count = {'a': 0, 't': 0, 'e': 0}
    upper, lower, nonalpha, score = 0, 0, 0, 0
    length = float(len(decrypt))
    for i in decrypt:
        # check for characters not in english plain text
        if ord(i)<32 or ord(i)>126: return -1
        if i.isupper(): upper += 1
        elif i.islower(): lower += 1
        elif (not i.isalpha()) and (i != " "): nonalpha += 1
        i.lower()
        if i in keys: alpha_count[i] += 1
    # check percentage of characters which are non alphabetic
    if nonalpha/length > 0.2: return -1
    # check if to many characters are upper case
    if upper != 0 and lower/float(upper) < 0.4: return -1
    for j in keys:
        if abs(alpha_count[j]/length-alpha_freq[j]) < 1 : score+=1
    return score


maxx, decrypted= 0, ''
# store decrypted cases in a list
cases = [''.join([chr(ord(c) ^ i) for c in encrypted]) for i in range(3, 127)]
for k in cases:
    score=scoring(k)
    if score>=0:
        print k

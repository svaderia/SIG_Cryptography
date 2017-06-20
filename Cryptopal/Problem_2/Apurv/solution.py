def fixed_xor(h1,h2):
    s3=str(hex(int(h1,16)^int(h2,16)))
    if s3[-1]=='L':
        s=s3[2:len(s3)-1]
    else:
        s=s3[2:]    
    return s

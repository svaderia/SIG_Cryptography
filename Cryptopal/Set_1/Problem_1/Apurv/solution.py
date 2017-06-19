from binascii import a2b_hex,b2a_base64

def hex_to_base64(hex_string):
    return str(b2a_base64(a2b_hex(hex_string)))

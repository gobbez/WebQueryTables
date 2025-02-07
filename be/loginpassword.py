import creds

def loginpassword(user_password):
    """Check if the password input from user is the same as the one in creds file, to enable full access"""
    creds_login = creds.DB_CONFIG
    if user_password == creds_login['password']:
        return True
    else:
        return False
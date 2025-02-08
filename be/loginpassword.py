import creds
from datetime import datetime

def loginpassword(user_password):
    """Check if the password input from user is the same as the one in creds file, to enable full access"""
    with open("log.txt", "a") as f:
        creds_login = creds.DB_CONFIG
        if user_password == creds_login['password']:
            f.write(f"\n\n{datetime.now()} -- User login SUCCESS")
            f.close()
            return True
        else:
            f.write(f"\n\n{datetime.now()} -- User login FAILED")
            f.close()
            return False
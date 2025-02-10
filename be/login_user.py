import creds
from datetime import datetime
import load_db

def loginuser(username, password):
    """Check if credentials match stored user credentials"""
    with open("log.txt", "a") as f:
        try:
            mydb = load_db.connect_db()
            mycursor = mydb.cursor()
            sql = f"SELECT username, password FROM appapi$default.users WHERE username={username} AND password={password}"
            mycursor.execute(sql)
            result = mycursor.fetch()
            if result:
                f.write(f"\n\n{datetime.now()} -- Login SUCCESS for user: {username}")
                f.close()
                return {"success": True, "message": "Login successful"}
            else:
                f.write(f"\n\n{datetime.now()} -- Login FAILED for user: {username}")
                f.close()
                return {"success": False, "message": "Invalid credentials"}
        except Exception as e:
            f.write(f"\nError: {e}")
            return {"status": "error", "message": str(e)}

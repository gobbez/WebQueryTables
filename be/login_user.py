import creds
from datetime import datetime
import load_db

def loginuser(username, password):
    """Check if credentials match stored user credentials"""
    with open("log.txt", "a") as f:
        try:
            mydb = load_db.connect_db()
            mycursor = mydb.cursor()
            sql = f"SELECT username, password FROM appapi$default.users WHERE username='{username}' AND password='{password}'"
            mycursor.execute(sql)
            result = mycursor.fetchone()
            if result:
                f.write(f"\n\n{datetime.now()} -- Login SUCCESS for user: {username}")
                f.close()
                return {"success": True, "message": "Login successful"}
            else:
                f.write(f"\n\n{datetime.now()} -- Login FAILED for user: {username}")
                f.close()
                return {"success": result, "message": "Invalid credentials"}
        except Exception as e:
            f.write(f"\nError: {e}")
            f.close()
            return {"status": "error", "message": str(e)}


def registeruser(username, password):
    """Create new row in user table"""
    with open("log.txt", "a") as f:
        try:
            mydb = load_db.connect_db()
            mycursor = mydb.cursor()
            sql = f"INSERT INTO appapi$default.users (username, password) VALUES ('{username}', '{password}')"
            mycursor.execute(sql)
            mydb.commit()

            f.write(f"\n\n{datetime.now()} -- Register SUCCESS for user: {username}")
            f.close()
            return {"success": True, "message": "Register successful"}
        except Exception as e:
            f.write(f"\n\n{datetime.now()} -- Register FAILED with Error: {e}")
            f.close()
            return {"status": "error", "message": str(e)}
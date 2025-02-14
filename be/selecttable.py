import load_db
from datetime import datetime
import updatetable


def select_all_tables():
    with open("log.txt", "a") as f:
        try:
            mydb = load_db.connect_db()
            mycursor = mydb.cursor()
            mycursor.execute("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'appapi$default'")
            result = mycursor.fetchall()
            mycursor.close()
            mydb.close()
            f.write(f"\nSuccess: {result}")
            return result
        except Exception as e:
            f.write(f"\nError: {e}")
    f.close()


def select_users():
    with open("log.txt", "a") as f:
        try:
            mydb = load_db.connect_db()
            mycursor = mydb.cursor()
            mycursor.execute(
                "SELECT * FROM appapi$default.users")
            result = mycursor.fetchall()
            mycursor.close()
            mydb.close()
            f.write(f"\nSuccess: {result}")
            return result
        except Exception as e:
            f.write(f"\nError: {e}")
    f.close()


def select_your_tables(username):
    with open("log.txt", "a") as f:
        try:
            mydb = load_db.connect_db()
            mycursor = mydb.cursor()
            query = """
                SELECT name 
                FROM appapi$default.tables
                WHERE username = %s
                """
            mycursor.execute(query, (username,))

            result = mycursor.fetchall()
            mycursor.close()
            mydb.close()
            f.write(f"\nSuccess: {result}")
            return result
        except Exception as e:
            f.write(f"\nError: {e}")
    f.close()
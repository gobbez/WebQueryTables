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


def select_users():
    with open("log.txt", "a") as f:
        try:
            mydb = load_db.connect_db()
            mycursor = mydb.cursor()
            mycursor.execute("SELECT * FROM appapi$default.users")
            # Get column names too
            columns = [col[0] for col in mycursor.description]
            result = mycursor.fetchall()
            # Convert results as dictionary
            dict_result = [dict(zip(columns, row)) for row in result]
            mycursor.close()
            mydb.close()
            f.write(f"\nSuccess: extracted {len(dict_result)} rows!")
            return dict_result
        except Exception as e:
            f.write(f"\nError: {e}")
    f.close()


def select_all_from_table(data):
    table = data['data'][0]
    with open("log.txt", "a") as f:
        try:
            mydb = load_db.connect_db()
            mycursor = mydb.cursor()
            query = f"""
                SELECT * 
                FROM appapi$default.{table}
                """
            mycursor.execute(query)
            # Get column names too
            columns = [col[0] for col in mycursor.description]
            result = mycursor.fetchall()
            # Convert results as dictionary
            dict_result = [dict(zip(columns, row)) for row in result]
            mycursor.close()
            mydb.close()
            f.write(f"\nSuccess: extracted {len(dict_result)} rows!")
            return dict_result
        except Exception as e:
            f.write(f"\nError: {e}")
        except Exception as e:
            f.write(f"\nError: {e}")
    f.close()
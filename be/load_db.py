import mysql.connector
import creds
from datetime import datetime


# -- Connect to DB MySql on PythonAnywhere --

def connect_db():
    """ Connect to database (hosted on Pythonanywhere) """
    return mysql.connector.connect(**creds.DB_CONFIG)


def show_dbs():
    """ Show every database """
    with open("log.txt", "a") as f:
        mydb = connect_db()
        mycursor = mydb.cursor()
        mycursor.execute("SHOW DATABASES")
        myresult = mycursor.fetchall()
        mycursor.close()
        mydb.close()

        f.write(f"\n\n{datetime.now()} -- Show every database")
        f.close()
    # Convert result in list
    return [db[0] for db in myresult]


def show_tables():
    """ Show every table """
    with open("log.txt", "a") as f:
        mydb = connect_db()
        mycursor = mydb.cursor()
        mycursor.execute("""
            SELECT TABLE_NAME
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_SCHEMA = 'appapi$default'
            AND TABLE_TYPE = 'BASE TABLE';
        """)
        myresult = mycursor.fetchall()
        mycursor.close()
        mydb.close()

        f.write(f"\n\n{datetime.now()} -- Show every table")
        f.close()

    # Convert result in list
    return [db[0] for db in myresult]

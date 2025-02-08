import mysql.connector
import creds


# -- Connect to DB MySql on PythonAnywhere --

def connect_db():
    """ Connect to database (hosted on Pythonanywhere) """
    return mysql.connector.connect(**creds.DB_CONFIG)


def show_dbs():
    """ Show every database """
    mydb = connect_db()
    mycursor = mydb.cursor()
    mycursor.execute("SHOW DATABASES")
    myresult = mycursor.fetchall()
    mycursor.close()
    mydb.close()

    # Convert result in list
    return [db[0] for db in myresult]


def show_tables():
    """ Show every table """
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

    # Convert result in list
    return [db[0] for db in myresult]

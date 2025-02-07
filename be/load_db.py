import mysql.connector
import creds


# -- Connect to DB MySql on PythonAnywhere --

def connect_db():
    """ Connect to database (hosted on Pythonanywhere) """
    return mysql.connector.connect(**creds.DB_CONFIG)


def show_dbs():
    """ Shows every database """
    mydb = connect_db()
    mycursor = mydb.cursor()
    mycursor.execute("SHOW DATABASES")
    myresult = mycursor.fetchall()
    mycursor.close()
    mydb.close()

    # Convert result in list
    return [db[0] for db in myresult]

import load_db
from datetime import datetime


def update_table_tables(data):
    with open("log.txt", "a") as f:
        try:
            tablename = data['tablename']
            username = data['username']
            f.write(f"\n{tablename}, {username}")
            # Save username and the new table name in table tables
            sql = "INSERT INTO appapi$default.tables (name, username) VALUES (%s, %s)"

            # Connects to DB
            mydb = load_db.connect_db()
            mycursor = mydb.cursor()
            mycursor.execute(sql, (tablename, username))
            mydb.commit()
            mycursor.close()
            mydb.close()

            f.write(f"\n\n{datetime.now()} -- {username} has created table: {tablename}")

        except Exception as e:
            f.write(f"\nError: {e}")
    f.close()


import load_db
from datetime import datetime
import updatetable

def create_table(data):
    with open("log.txt", "a") as f:
        try:
            # Elaborates data (to get table name, rows, types..)
            tablename = data['tablename']

            f.write(f"\n\n{datetime.now()} -- Starting query:")
            f.write(f"DATA RECEIVED: {data}")

            # Start SQL query of create table
            sql = f"CREATE TABLE appapi$default.{tablename} ("
            # Create every column
            id_prim = False
            for row in data['columns']:
                if row['type'] == 'VARCHAR':
                    sql += f"{row['name']} {row['type']}(255), "
                elif row['type'] == 'INT':
                    sql += f"{row['name']} {row['type']}, "
                elif row['type'] == 'DATETIME':
                    sql += f"{row['name']} DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, "
                elif row['type'] == 'IDPRIMARY':
                    if id_prim == False:
                        id_prim = row['name']
                    sql += f"{row['name']} INT AUTO_INCREMENT, "
                else:
                    raise ValueError()

            if id_prim != False:
                sql += f"PRIMARY KEY ({id_prim})"
            else:
                sql += "ID INT AUTO_INCREMENT, PRIMARY KEY (ID)"
            sql += ")"

            f.write(f"\n{sql}")

            # Connects to DB
            mydb = load_db.connect_db()
            mycursor = mydb.cursor()
            mycursor.execute(sql)
            mycursor.close()
            mydb.close()
            f.write("\nSuccess!")

            insert_new = updatetable.update_table_tables(data)
            f.write(f"Added username into table tables")

            return {"status": "success", "message": "Table created successfully"}

        except Exception as e:
            f.write(f"\nError: {e}")
            return {"status": "error", "message": str(e)}

    f.close()

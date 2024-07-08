import mysql.connector


def query_data_from_mysql():
    conn = mysql.connector.connect(
        host="localhost", user="root", password="root", database="codeforge"
    )

    cursor = conn.cursor()
    cursor.execute(
        """ CREATE TABLE IF NOT EXISTS sessions (
                id VARCHAR(255) UNIQUE,
                content TEXT,
                problemStatement TEXT
            )"""
    )
    cursor.execute("SELECT * FROM sessions")
    data = cursor.fetchall()
    print(data)
    cursor.close()
    conn.close()

    return data


query_data_from_mysql()

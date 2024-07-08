import sqlite3
import mysql.connector
import os

# production = True
# if production:
#     db_host = os.environ.get("SKILLSENSE_DB_HOST")
#     db_username = os.environ.get("SKILLSENSE_DB_USERNAME")
#     db_port = os.environ.get("SKILLSENSE_DB_PORT")
#     db_password = os.environ.get("SKILLSENSE_DB_PASSWORD")
# else:
#     db_host = 'localhost'
#     db_username = 'root'
#     db_password = 'root'

current_directory = os.path.abspath(os.getcwd())
    
    # Join the current directory with the provided database name
db_path = os.path.join(current_directory, "example.db")
class DatabaseManager:

    def __init__(self, db_path=db_path):
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self.cursor = self.conn.cursor()
        self.create_table_if_not_exists()

    def create_table_if_not_exists(self):
        self.cursor.execute(
            """ CREATE TABLE IF NOT EXISTS sessions (
                id VARCHAR(255) UNIQUE,
                content TEXT,
                problemStatement TEXT,
                title TEXT,
                name TEXT,
                email TEXT,
                jd_id TEXT,
                user TEXT,
                marktimestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                token TEXT
            )"""
        )

        self.cursor.execute(
            """CREATE TABLE IF NOT EXISTS codex_problems (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
                statement TEXT,
                user TEXT,
                marktimestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )"""
            )
        
        self.conn.commit()

    def execute_query(self, query, params=None):
        if params:
            self.cursor.execute(query, params)
        else:
            self.cursor.execute(query)
        self.conn.commit()

    def fetch_one(self, query, params=None):
        if params:
            self.cursor.execute(query, params)
        else:
            self.cursor.execute(query)
        return self.cursor.fetchone()

    def fetch_all(self, query, params=None):
        if params:
            self.cursor.execute(query, params)
        else:
            self.cursor.execute(query)
        return self.cursor.fetchall()
    


    def create_session(self, id, content, problemStatement):
            self.execute_query(
                "INSERT INTO sessions (id, content, problemStatement) VALUES (?, ?, ?)",
                (id, content, problemStatement),
            )


    def create_session_with_title(self, id, title, name, email,jd_id,content, problemStatement,token):
            self.execute_query(
                "INSERT INTO sessions (id, title, name,email,jd_id,content, problemStatement,token) VALUES (?, ?, ?,?,?,?,?,?)",
                (id, title, name, email,jd_id, content, problemStatement,token),
            )

    def create_problemstatement(self, statement):
        self.execute_query(
            "INSERT INTO codex_problems (statement) VALUES (?)", (statement,)
        )

    def get_session_by_id(self, user_id):
        return self.fetch_one("SELECT * FROM sessions WHERE id=?", (user_id,))

    def get_problemstatement_by_id(self, user_id):
        return self.fetch_one("SELECT * FROM codex_problems WHERE id=?", (user_id,))

    def get_all_sessions(self):
        return self.fetch_all("SELECT * FROM sessions")
    
    def get_all_registered_sessions(self):
        return self.fetch_all("SELECT * from sessions s WHERE email IS NOT NULL")

    def get_all_problemstatement(self):
        return self.fetch_all("SELECT * FROM codex_problems")

    def update_session(self, id, content, problemStatement):
        self.execute_query(
            "UPDATE sessions SET content=? WHERE id=?", (content, id))
        self.execute_query(
            "UPDATE sessions SET problemStatement=? WHERE id=?",
            (problemStatement, id),
        )

    def update_problemstatement(self, id, statement):
        self.execute_query(
            "UPDATE codex_problems SET statement=? WHERE id=?", (
                statement, id)
        )
    def remove_token(self, id, ):
        self.execute_query(
            "UPDATE sessions SET token=? WHERE id=?", ('', id))
    def delete_sessions(self, id):
        self.execute_query("DELETE FROM sessions WHERE id=?", (id,))

    def delete_problemstatement(self, id):
        self.execute_query("DELETE FROM codex_problems WHERE id=?", (id,))

    def close_connection(self):
        self.conn.close()



# Example Usage:
db_manager = DatabaseManager()
# db_manager.create_session("ffffrerg","John Doe", "john.doe@example.com")
# db_manager.update_session("1","poda","potta")
# all_users = db_manager.get_all_sessions()
# print(all_users)
# db_manager.delete_sessions("1")
# all_users = db_manager.get_all_sessions()
# print(all_users)
# Don't forget to close the connection when done
print(db_manager.get_all_problemstatement())
# db_manager.close_connection()
        
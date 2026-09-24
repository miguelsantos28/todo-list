import sqlite3
conexao = sqlite3.connect('app/backend/database.db', check_same_thread=False)

def criar_conexao():
    conexao.row_factory = sqlite3.Row
    cursor = conexao.cursor()
    return cursor, conexao

cursor, conexao = criar_conexao()

cursor.execute("""CREATE TABLE IF NOT EXISTS tarefas(
    id_tarefa INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    prazo TEXT,
    concluida BOOLEAN DEFAULT FALSE

)""")
conexao.commit()

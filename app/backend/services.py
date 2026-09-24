from app.backend.db import cursor, conexao
from app.backend.schemas import CriarTarefa
from app.backend.schemas import MostrarTarefa
def criar_tarefa(dados):
    cursor.execute("INSERT INTO tarefas (nome, prazo) VALUES (?, ?)", (dados.nome, dados.prazo))
    id = cursor.lastrowid
    conexao.commit()
    return{
        "id_tarefa": id,
        "nome": dados.nome,
        "prazo": dados.prazo,
        "concluida": False
    }

def listar_tarefas():
    cursor.execute("SELECT * FROM tarefas")
    linha = cursor.fetchall()
    lista_de_tarefas = []
    for i in linha:
        lista_de_tarefas.append({"id_tarefa": i["id_tarefa"], "nome": i["nome"], "prazo": i["prazo"], "concluida": i["concluida"]})
    return lista_de_tarefas

def apagar_tarefa(id_tarefa):
    cursor.execute("SELECT * FROM tarefas WHERE id_tarefa = ?", (id_tarefa,))
    tarefa_encontrada = cursor.fetchone()
    if tarefa_encontrada:
        cursor.execute("DELETE FROM tarefas WHERE id_tarefa = ?", (id_tarefa,))
        conexao.commit()
        return{
        "id_tarefa": tarefa_encontrada["id_tarefa"],
        "nome": tarefa_encontrada["nome"],
        "prazo": tarefa_encontrada["prazo"],
        "concluida": tarefa_encontrada["concluida"]
        }
    return None

def marcar_concluida(id_tarefa):
    cursor.execute("SELECT * FROM tarefas WHERE id_tarefa = ?", (id_tarefa,))
    tarefa_encontrada = cursor.fetchone()
    if tarefa_encontrada:
        cursor.execute("UPDATE tarefas SET concluida = NOT concluida WHERE id_tarefa = ?", (id_tarefa,))
        conexao.commit()
        cursor.execute("SELECT * FROM tarefas WHERE id_tarefa = ?", (id_tarefa,))
        tarefa_encontrada = cursor.fetchone()
        return{
        "id_tarefa": tarefa_encontrada["id_tarefa"],
        "nome": tarefa_encontrada["nome"],
        "prazo": tarefa_encontrada["prazo"],
        "concluida": tarefa_encontrada["concluida"]
        }
    return None
    
def editar_tarefa(id_tarefa, dados):
    cursor.execute("SELECT * FROM tarefas WHERE id_tarefa = ?", (id_tarefa,))
    tarefa_encontrada = cursor.fetchone()
    if tarefa_encontrada:
        cursor.execute("UPDATE tarefas SET nome = ?, prazo = ? WHERE id_tarefa = ?", (dados.nome, dados.prazo, id_tarefa))
        conexao.commit()
        cursor.execute("SELECT * FROM tarefas WHERE id_tarefa = ?", (id_tarefa,))
        tarefa_encontrada = cursor.fetchone()
        return{
        "id_tarefa": tarefa_encontrada["id_tarefa"],
        "nome": tarefa_encontrada["nome"],
        "prazo": tarefa_encontrada["prazo"],
        "concluida": tarefa_encontrada["concluida"]
        }
    return None

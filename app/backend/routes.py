from fastapi import APIRouter
from app.backend.schemas import CriarTarefa, MostrarTarefa
from fastapi import HTTPException, status
from app.backend.services import criar_tarefa
from app.backend.services import listar_tarefas
from app.backend.services import apagar_tarefa
from app.backend.services import editar_tarefa
from app.backend.services import marcar_concluida


router = APIRouter()

@router.post("/tarefas", status_code = status.HTTP_201_CREATED, response_model = MostrarTarefa)
def create_task(dados: CriarTarefa):
    return criar_tarefa(dados)

@router.get("/tarefas", status_code = status.HTTP_200_OK, response_model = list[MostrarTarefa])
def list_tasks():
    return listar_tarefas()

@router.delete("/tarefas/{id_tarefa}", status_code = status.HTTP_200_OK, response_model = MostrarTarefa)
def delete_task(id_tarefa: int):
    task_deleted = apagar_tarefa(id_tarefa)
    if not task_deleted:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Tarefa não encontrada"
        )
    return task_deleted

@router.put("/tarefas/{id_tarefa}", status_code = status.HTTP_200_OK, response_model = MostrarTarefa)
def update_task(id_tarefa: int, dados: CriarTarefa):
    task_updated = editar_tarefa(id_tarefa, dados)
    if not task_updated:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Tarefa não encontrada"
        )
    return task_updated

@router.patch("/tarefas/{id_tarefa}/concluir", status_code = status.HTTP_200_OK, response_model = MostrarTarefa)
def check_done(id_tarefa: int):
    done_checked = marcar_concluida(id_tarefa)
    if not done_checked:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Tarefa não encontrada"
        )
    return done_checked
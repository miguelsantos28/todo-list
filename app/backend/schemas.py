from pydantic import BaseModel
from datetime import date

class CriarTarefa(BaseModel):
    nome: str
    prazo: date

class MostrarTarefa(BaseModel):
    id_tarefa: int
    nome: str
    prazo: date
    concluida: bool
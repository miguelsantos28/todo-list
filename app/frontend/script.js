const url = "http://127.0.0.1:8000/tarefas";
const form = document.getElementById("form-tarefa");
 
let tarefaEditandoId = null; // guarda o id da tarefa quando o form está em modo "editar"
 
async function carregarTarefas() {
  const resposta = await fetch(url);
  const tarefas = await resposta.json();
  return tarefas;
}
 
function criarCardTarefa(tarefa) {
  const template = document.getElementById("template-tarefa");
  const clone = template.content.cloneNode(true);
 
  const card = clone.querySelector(".tarefa-card");
  card.dataset.id = tarefa.id_tarefa;
 
  const nomeEl = clone.querySelector(".tarefa-nome");
  nomeEl.textContent = tarefa.nome;
 
  const prazoEl = clone.querySelector(".tarefa-prazo");
  prazoEl.textContent = tarefa.prazo;
 
  const checkboxEl = clone.querySelector(".tarefa-checkbox");
  checkboxEl.checked = tarefa.concluida;
 
  return card;
}
 
function atualizarContador(seletor, delta) {
  const elemento = document.querySelector(seletor);
  const valorAtual = Number(elemento.textContent);
  elemento.textContent = valorAtual + delta;
}
 
//Renderização inicial
 
const tarefas = await carregarTarefas();
 
const nao_concluidas = tarefas.filter(function (tarefa) {
  return !tarefa.concluida;
});
 
const concluidas = tarefas.filter(function (tarefa) {
  return tarefa.concluida;
});
 
nao_concluidas.forEach(function (tarefa) {
  const card = criarCardTarefa(tarefa);
  document.querySelector("#lista-pendentes").appendChild(card);
});
 
concluidas.forEach(function (tarefa) {
  const card = criarCardTarefa(tarefa);
  document.querySelector("#lista-concluidas").appendChild(card);
});
 
document.querySelector("#contador-pendentes").textContent = nao_concluidas.length;
document.querySelector("#contador-concluidas").textContent = concluidas.length;
 
// Criar / editar tarefa
 
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const inp_nome = document.getElementById("input-nome").value;
  const inp_prazo = document.getElementById("input-prazo").value;
 
  const dadosTarefa = { nome: inp_nome, prazo: inp_prazo };
  const dadosJson = JSON.stringify(dadosTarefa);
 
  if (tarefaEditandoId === null) {
    // modo criar
    const resposta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: dadosJson,
    });
    const tarefaCriada = await resposta.json();
 
    const card = criarCardTarefa(tarefaCriada);
    document.querySelector("#lista-pendentes").appendChild(card);
    atualizarContador("#contador-pendentes", 1);
  } else {
    // modo editar
    const urlEditar = `${url}/${tarefaEditandoId}`;
    const resposta = await fetch(urlEditar, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: dadosJson,
    });
    const tarefaEditada = await resposta.json();
 
    const cardAntigo = document.querySelector(`.tarefa-card[data-id="${tarefaEditandoId}"]`);
    if (cardAntigo) {
      cardAntigo.querySelector(".tarefa-nome").textContent = tarefaEditada.nome;
      cardAntigo.querySelector(".tarefa-prazo").textContent = tarefaEditada.prazo;
    }
 
    tarefaEditandoId = null;
    document.querySelector("#botao-submit-form").textContent = "Adicionar tarefa";
  }
 
  form.reset();
});
 
//Concluir / desmarcar tarefa
 
async function alternarConcluida(event) {
  if (!event.target.classList.contains("tarefa-checkbox")) return;
 
  const card = event.target.closest(".tarefa-card");
  const urlConcluir = `${url}/${card.dataset.id}/concluir`;
 
  await fetch(urlConcluir, { method: "PATCH" });
 
  const estavaEmPendentes = card.closest("#lista-pendentes") !== null;
 
  if (estavaEmPendentes) {
    document.querySelector("#lista-concluidas").appendChild(card);
    atualizarContador("#contador-pendentes", -1);
    atualizarContador("#contador-concluidas", 1);
  } else {
    document.querySelector("#lista-pendentes").appendChild(card);
    atualizarContador("#contador-concluidas", -1);
    atualizarContador("#contador-pendentes", 1);
  }
}
 
document.querySelector("#lista-pendentes").addEventListener("click", alternarConcluida);
document.querySelector("#lista-concluidas").addEventListener("click", alternarConcluida);
 
//Apagar tarefa
 
async function apagarTarefa(event) {
  if (!event.target.classList.contains("btn-apagar")) return;
 
  const card = event.target.closest(".tarefa-card");
  const urlApagar = `${url}/${card.dataset.id}`;
 
  await fetch(urlApagar, { method: "DELETE" });
 
  const estavaEmPendentes = card.closest("#lista-pendentes") !== null;
  card.remove();
 
  if (estavaEmPendentes) {
    atualizarContador("#contador-pendentes", -1);
  } else {
    atualizarContador("#contador-concluidas", -1);
  }
}
 
document.querySelector("#lista-pendentes").addEventListener("click", apagarTarefa);
document.querySelector("#lista-concluidas").addEventListener("click", apagarTarefa);
 
//Editar tarefa
 
function entrarEmModoEdicao(event) {
  if (!event.target.classList.contains("btn-editar")) return;
 
  const card = event.target.closest(".tarefa-card");
  const nomeAtual = card.querySelector(".tarefa-nome").textContent;
  const prazoAtual = card.querySelector(".tarefa-prazo").textContent;
 
  document.getElementById("input-nome").value = nomeAtual;
  document.getElementById("input-prazo").value = prazoAtual;
 
  tarefaEditandoId = card.dataset.id;
  document.querySelector("#botao-submit-form").textContent = "Salvar edição";
}
 
document.querySelector("#lista-pendentes").addEventListener("click", entrarEmModoEdicao);
document.querySelector("#lista-concluidas").addEventListener("click", entrarEmModoEdicao);

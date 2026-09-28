const url = "http://127.0.0.1:8000/tarefas"

async function carregarTarefas() {
    const resposta = await fetch(url);
    const tarefas = await resposta.json();
    return tarefas;
}

const tarefas = await carregarTarefas();

function criarCardTarefa(tarefa){
    
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

const nao_concluidas = tarefas.filter(function(tarefa){
return !tarefa.concluida
});

const concluidas = tarefas.filter(function(tarefa){
return tarefa.concluida
});

nao_concluidas.forEach(function(tarefa){
    const card = criarCardTarefa(tarefa);
    document.querySelector("#lista-pendentes").appendChild(card)
});

concluidas.forEach(function(tarefa){
    const card = criarCardTarefa(tarefa);
    document.querySelector("#lista-concluidas").appendChild(card)
});

const contador_nc = nao_concluidas.length;
document.querySelector("#contador-pendentes").textContent = contador_nc;

const contador_conc = concluidas.length;
document.querySelector("#contador-concluidas").textContent = contador_conc;



document.getElementById("form-tarefa").addEventListener("submit", async function(event) {
  event.preventDefault();
  const inp_nome = document.getElementById("input-nome").value;
  const inp_prazo = document.getElementById("input-prazo").value;

  const novaTarefa = {"nome": inp_nome, "prazo": inp_prazo};
  const dadosJson = JSON.stringify(novaTarefa);

  const resposta =  await fetch(url, {
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: dadosJson
  });
  const tarefaCriada = await resposta.json();

  const criar_card = criarCardTarefa(tarefaCriada);
  document.querySelector("#lista-pendentes").appendChild(criar_card)

  Number(document.querySelector("#contador-pendentes").textContent) + 1
})

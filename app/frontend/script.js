async function carregarTarefas() {
    const resposta = await fetch("http://127.0.0.1:8000/tarefas");
    const tarefas = await resposta.json();
    console.log(tarefas);
}

carregarTarefas();

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

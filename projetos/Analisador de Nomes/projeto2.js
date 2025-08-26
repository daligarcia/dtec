function adicionarTarefa() {
  const input = document.getElementById('novaTarefa');
  const texto = input.value.trim();

  if (texto === '') {
    alert('Digite uma tarefa!');
    return;
  }

const li = document.createElement('li');
  
const span = document.createElement('span');
  span.textContent = texto;
  span.className = 'texto-tarefa';

  span.onclick = function () {
  span.classList.toggle('feito');
  };

const botaoRemover = document.createElement('button');
  botaoRemover.textContent = 'Remover';
  botaoRemover.className = 'remover';

  // Remover a tarefa ao clicar no botão
  botaoRemover.onclick = function () {
    li.remove();
  };

  // Adicionar span e botão ao li
  li.appendChild(span);
  li.appendChild(botaoRemover);

  // Adicionar o li na lista
  document.getElementById('listaTarefas').appendChild(li);

  // Limpar o campo de input e focar nele
  input.value = '';
  input.focus();
}

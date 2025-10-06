const { application } = require("express");

//Criando uma constante com o endereço da API
const API_URL = "http://localhost:3002/usuarios";

//Seleção de Elementos do HTML inicial
const userCardsContainer = document.getElementById('user-cards-container');
const addUserForm = document.getElementById('addUserForm');
const btnListUsers = document.getElementById('btnListUsers');

//Seleção de Elementos do MODAL
const editModal = document.getElementById('editModal');
const editUserForm = document.getElementById('editUserForm');
const btnCancelEdit = document.getElementById('btnCancelEdit');
const editIdInput = document.getElementById('editId');
const editNameInput = document.getElementById('editName');
const  editAgeInput = document.getElementById('editAge');

//Criação de FUNÇÕES
function fetchAndRenderUsers() {
    //Faz uma  requisição GET para a URL
    fetch(API_URL)
        .then(response => response.json())
        //renderUser função que vai organizar as informações na tela
        .then(users => fetchAndRenderUsers(users))
        .catch(error => {
            console.error("Erro ao buscar usuários", error);
            userCardsContainer.innerHTML = `<p>Erro ao carregar usuários</p>`
        })

}

//Função para adicionar um novo usuário
function addUser(userData){
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(() => {
        addUserForm.reset();
        fetchAndRenderUsers();
    })
    .catch(error => console.error("Erro ao adicionar usuário", error));
}

//Função para editar usuário existente
function editUser(userId, userData){
    fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(() => {
        editModal.style.display = 'none';
        fetchAndRenderUsers()
    })
    .catch(error => console.error("Erro ao editar o usuário", error));
}

function deleteUser(userId) {
    fetch(`${API_URL}/${userId}` {
        method: 'Delete'
    })
    .then(response => response.json())
    .then(() => {
        fetchAndRenderUsers()
    })
    .catch(error => console.error('Erro ao excluir usuário', error))
}

function renderUsers() {
    userCardsContainer.innerHTML = "";

    if(users.length === 0) {
        userCardsContainer.innerHTML = `<p>Nenhum usuário cadastrado</p>`
        return;
    }

    users.forEach(user => {
        const userCard = document.createElement('Div');
        userCard.className = "user-card";

        userCard.innerHTML = `
            <div> class="user-info">
                <p><strong>\ID:</strong>${user.id}</p>
                <p><strong>\Nome:</strong>${user.nome}</p>
                <p><strong>\Idade:</strong>${user.idade}</p>
            </div>
            <div class="card-buttons">
                <button class = btn-edit">Editar</button>
                <button class = btn-delete">Editar</button>
        `;

        const editBtn = userCard.querySelector('.btn-edit');
        const deletBtn = userCard.querySelector('.btn-delete');

        editBtn.addEventListener('click', () => {
            editIdInput.value = user.id;
            editNameInput.value = user.name;
            editAgeInput.value = user.idade;
            editModal.style.display = 'flex';
        })
    })
}
// Importa o módulo 'express' para criar e gerenciar a aplicação web.
const express = require('express');

// Importa o módulo 'cors' para permitir requisições de outras origens.
const cors = require('cors');

// Cria uma instância da aplicação Express.
const app = express();

// Middleware: 'app.use()' é usado para adicionar funcionalidades à aplicação.
app.use(express.json());

// Middleware: app.use(cors()) habilita o CORS para todas as rotas da API.
// Sem ele, o navegador bloquearia requisições de domínios diferentes.
app.use(cors())

// Define a porta em que o servidor vai escutar as requisições.
const PORT = 3001;

// --- Banco de Dados em Memória ---
let usuarios = [
    {id: 1, nome: "Ana", idade: 25},
    {id: 2, nome: "Carlos", idade: 30},
    {id: 3, nome: "Maria", idade: 22},
    {id: 4, nome: "Marcos", idade: 18},
    {id: 5, nome: "Maria Clara", idade: 24}
]

// Rota inicial ou "raiz" (/).
app.get('/', (request, response) => {
    response.send("TESTE");
})

// Rota para listar todos os usuários
app.get('/usuarios', (request, response) => {
    response.json(usuarios);
})

// Rota para buscar um único usuário por ID.
// O ':id' é um parâmetro de URL que captura o valor passado na rota.
app.get('/usuarios/:id', (request, response) => {
    // Acessa o valor do parâmetro 'id' da requisição.
    const id = request.params.id;

    // Procura no array 'usuarios' o objeto cujo 'id' corresponde ao 'id' da requisição.
    // O método find() retorna o primeiro elemento que satisfaz a condição.
    const usuario = usuarios.find(u => u.id == id);

    if (usuario) {
        response.json(usuario)
    } else{
        response.status(404).json({mensagem: "Usuario não encontrado"})
    }

})
app.delete('/usuarios/:id', (require, response) =>{
    const id = require.params.id
    usuarios = usuarios.filter(u => u.id != id);
    response.json({mensagem: "Usuario removido com sucesso"})
})

app.post('/usuarios', (require, response) => {
    const novoUsuario = {
        id: usuarios.length + 1,
        nome: require.body.nome,
        idade: require.body.idade
    };

    usuarios.push(novoUsuario)
    response.status(201).json(novoUsuario);
})

app.put('/usuarios/:id', (require, response) => {
    const id= require.params.id
    const nome = require.body.nome
    const idade = require.body.idade

    const usuario = usuarios.find(u => u.id == id)

    if (!usuario) {
        return response.status(404).json({mensagem: "Usuário Não Encontrado"})
    }
    usuario.nome = nome || usuario.nome
    usuario.idade = idade || usuario.idade
    response.json(usuario)
})


app.get('/usuarios/:nome', (req, response) =>{
    const buscaNome = request.params.nome.toLowerCase()
    const resultados = usuarios.filter( u => u.nome.toLocaleLowerCase().includes(buscaNome))
    if(resultados.length > 0) {
        response.json(resultados)
    }else{
        response.status(404).json({mensagem: "Usuario não encontrado"})
    }
})

//Buscar usuário pela idade
app.get('/usuarios/idade/:idade', (require, response) => {
    
    const idade = require.params.idade
    resultado = usuarios.filter(u => u.idade == idade);
    
    if (resultado.length > 0){
        response.json(resultado)
    }else{
        response.status(404).json({mensagem: "Usuario Não Encontrado"})
    }

})


// --- Início do Servidor --
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
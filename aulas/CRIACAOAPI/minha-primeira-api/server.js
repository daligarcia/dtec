//Importa o dotenv no início para carregar variáveis
require('dotenv').config()

//Importando o express
const express = require('express')
//Importação cors
const cors = require('cors')
//Iniciar o Mongoose pacote MONGODB
const mongoose= require('mongoose');

const mongoURI = process.env.MONGO_URI
const PORT = process.env.PORT || 3000

mongoose.connect(mongoURI)
    .then(() => console.log("Conectado ao Mongodb"))
    .catch(err => console.error("Erro de conexão", err));

const usuarioSchema = new mongoose.Schema ({
  nome: {type: String, required: true},
  idade: {type: Number, required: true}
}, {timestamps: true})

//Modelo Collection
const Usuario = mongoose.model('Usuario', usuarioSchema)

//Criando minha aplicação
const app = express();

//Permitir trabalhar com json
app.use(express.json());
//permitir trabalhar com cors
app.use(cors())




app.get('/',(req,res) => {
  res.send("PÁGINA INICIAL")
})


app.get('/usuarios', async (req,res) => {
    try {
      const usuarios = await Usuario.find({});
      res.json(usuarios)
    } catch (error) {
      res.status(500).json({mensagem: "Erro ao buscar usuários", erro: error.message})
    }
})

app.get('/usuarios/:id', async (req, res) => {
  try{
    const id = req.params.id
    const usuario = await Usuario.findById(id);

    if(usuario){
      res.json(usuario)
    }else{
      res.status(404).json({mensagem: "Usuario Não Encontrado"})
    }
  } catch(error) {
    res.status(400).json({mensagem: "Erro de servidor", erro: error.message})
  }
})  
app.get('/usuarios/nome/:nome', async (req,res) => {
  try{
    const buscaNome = req.params.nome
    const resultados = await Usuario.find({
      nome: {$regex: buscaNome, $options: 'i'}
    });
    if(resultados > 0) {
      res.json(resultados);
    }else{
      res.status(404).json({mensagem: "Usuário Não Encontrado"})
    }
  }catch(error) {
    console.error("Erro na Busca", error);
    res.status(500).json({mensagem: "Erro no Servidor", erro: error.message})
  }
})

app.get('/usuarios/idade/:idade', async (req,res) => {
  try{
    const buscaIdade = req.params.idade
    const resultados = await Usuario.find({
      idade: buscaIdade
    });
    if(resultados > 0) {
      res.json(resultados);
    }else{
      res.status(404).json({mensagem: "Usuário Não Encontrado"})
    }
  }catch(error) {
    console.error("Erro na Busca", error);
    res.status(500).json({mensagem: "Erro no Servidor", erro: error.message})
  }
})


app.delete('/usuarios/:id', async (req, res) => {
  try{
    const id = req.params.id
    const usuarioDeletado = await Usuario.findByIdAndDelete(id);

    if(!usuarioDeletado){
      return res.status(404).json({mensagem: "Usuário não Encontrado"})
    }
    res.json({mensagem: "Usuário Deletado", usuario: usuarioDeletado})
  }catch(error) {
    res.status(400).json({mensagem: "Erro ao Deletar", erro: error.message})
  }
   
})

app.post('/usuarios', (req, res) => {
  const novoUsuario = {
    id: usuarios.length + 1,
    nome: req.body.nome,
    idade: req.body.idade
  };
  usuarios.push(novoUsuario)
  res.status(201).json(novoUsuario)
})

app.put('/usuarios/:id', (req,res) => {
  const id = req.params.id;
  const nome = req.body.nome
  const idade = req.body.idade

  const usuario = usuarios.find(u => u.id == id)

  if (!usuario){
    return res.status(404).json({mensagem: "Usuário Não encontrado"})
  }
  usuario.nome = nome || usuario.nome
  usuario.idade = idade || usuario.idade
  res.json(usuario)
})

//Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor na porta ${PORT}`)
})
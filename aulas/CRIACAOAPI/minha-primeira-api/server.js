//Importa o dotenv no início para carregar variáveis
require('dotenv').config()

//Importação do Express
const express = require('express');
//Importação do cors
const cors = require('cors');
//Iniciar o Mongoose pacote MONGODB
const mongoose= require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Importação Models
const Pessoa = require('./models/Pessoa')
const User = require('./models/User')

const mongoURI = process.env.MONGO_URI
const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(mongoURI)
    .then(() => console.log("Conectado ao MongoDB"))
    .catch(err => console.error("Erro de conexão", err));

const generateToken = (id) => {
    return jwt.sign({id}, JWT_SECRET, {expiresIn: "1d"})
}

//Função protetora dos endpoints
const protect = (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startWith('Bearer')){
        try{
        token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, JWT_SECRET);
        next()
    }catch(error) {
        return res.status(401).json({mensagem: "Token Inválido"})
    }
  }
}


    //Criar a Aplicação 
const app = express();

//Permitir trabalhar com JSON
app.use(express.json());
//Permitir trabalhar com cors
app.use(cors())

app.get('/',(req, res) => {
    res.send("PÁGINA INICIAL");
})

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Pessoa.find({});
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({mensagem: "Erro ao buscar usuários", erro: error.message})
    }
})

app.get('/usuarios/:id', async (req, res) =>{
    try{
        const id = req.params.id
        const usuario = await Pessoa.findById(id);
        if(usuario){
            res.json(usuario)
        }else{
            res.status(404).json({mensagem: "Usuário Não Encontrado"})
        }
    } catch(error) {
        res.status(400).json({mensagem: "Erro de servidor", erro: error.message})
    }
})

//ROTAS ADMIN
app.post('/api/register-admin', async(req,res) => {
    const{ email, password } = req.body
    try{
        const userExists = await User.findOne({email})
        if(userExists) {
            return res.status(404).json({mensagem: "Usuário já existe"})
        }
        const user = await User.create({email, password})
        res.status(201).json({mensagem: "Usuário criado com sucesso"})
    }catch(error) {
        res.status(500).json({mensagem: "Erro noregistro", erro: error.message})
    }
})

//ROTA DE LOGIN 
app.post('api/login-admin', async(req,res) =>{
    const {email, password} = req.body
    try{
        const user = await User.findOne({email}).select('password')

        if(user && (await user.matchPassowrd(password))) {
            res.json ({
                email: user.email,
                token: generateToken(user._id),
                mensagem: "login realizado"
            })
        } else {
            res.status(401).json({mensagem: "Credencial Inválido"})
        }
    } catch(error) {
        res.status(500).json({mensagem: "Erro de login", erro: error.message})
    }
})



app.get('/usuarios/nome/:nome', async (req,res)=> {
    try{
        const buscaNome = req.params.nome
        const resultados = await Pessoa.find({
            nome: {$regex: buscaNome, $options: 'i'}
        });
        if(resultados > 0) {
            res.json(resultados);
        }else {
            res.status(404).json({mensagem: "Usuário Não Encontrado"})
        }
    }catch(error) {
        console.error("Erro na Busca", error);
        res.status(500).json({mensagem: "Erro no Servidor", erro: error.message})
    }
    
})

app.get('/usuarios/idade/:idade', async (req,res)=> {
    try{
        const buscaIdade = req.params.idade
        const resultados = await Pessoa.find({
            idade: buscaIdade
        });
        if(resultados > 0) {
            res.json(resultados);
        }else {
            res.status(404).json({mensagem: "Usuário Não Encontrado"})
        }
    }catch(error) {
        console.error("Erro na Busca", error);
        res.status(500).json({mensagem: "Erro no Servidor", erro: error.message})
    }  

})

app.delete('/usuarios/:id', protect, async (req,res) =>{
    try{
        const id = req.params.id;
        const usuarioDeletado = await Pessoa.findByIdAndDelete(id);

        if(!usuarioDeletado){
            return res.status(404).json({mensagem: "Usuário não Encontrado"})
        }
        res.json({mensagem: "Usuário Deletado", usuario: usuarioDeletado})
    }catch(error) {
        res.status(400).json({mensagem: "Erro ao Deletar", erro: error.message})
    }

})

app.post('/usuarios', async (req,res) => {
    try {
        const novoUsuario = await Pessoa.create({
            nome: req.body.nome,
            idade: req.body.idade
        });
        res.status(201).json(novoUsuario);
    }catch (error) {
        res.status(400).json({mensagem: "Erro ao Salvar", erro: error.message})
    }
})

app.put('/usuarios/:id',async (req,res) => {
   try {
    const id = req.params.id
    const nome = req.body.nome
    const idade = req.body.idade
    const usuarioAtualizado = await Pessoa.findByIdAndUpdate(
        id,
        {nome, idade},
        {new: true, runValidators: true}
    )
    if (!usuarioAtualizado){
        return res.status(404).json({mensagem: "Usuário Não Encontrado"})
    }
    res.json(usuarioAtualizado)
   } catch(error) {
    res.status(400).json({mensagem: "Erro ao atualizar", erro: error.message})
   }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta${PORT}`)
})
const {calcula} = require('./app');
const server = require('express').Router();
const { autenticate } = require('./functions');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://kanbanUser:BVNYxza48DnKp6W@cluster0.yk91m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

server.get('/', (req, res) =>{
    const template = `
    <div>
        <h3 style="margin-top: 20%;" align='center'>Bem vindo a API do Clone do Trello</h3>
        <p align='center'> Segue o link do Repositorio da Aplicação: https://github.com/QuintansC/drag-and-drop </p>
        <p align='center'> Segue o link do Repositorio da API: https://github.com/QuintansC/Api-Simples </p>
    </div>
    `
    try{
        res.status(404).send(template);
    }catch(error){
        res.status(404).send(template);
    }
})

server.post('/calcula', (req, res, next) => { 
    const origin = req.body.origem;
    const destiny = req.body.destino;
    const minutes = req.body.minutos;
    const plan = req.body.plano;
    const teste = calcula(origin, destiny, minutes, plan);

    res.status(200).send({
        adicional: teste.adicional, 
        total: teste.total, 
        valorInicial: teste.valorInicial
    });
});

server.post('/cadastrar', (req, res, next) =>{
    client.connect(async err => {
        try{
            const collection = client.db("kanban").collection("login");
            const query = await collection.find({user: req.body.user}).toArray();
            const queryEmail = await collection.find({email: req.body.email}).toArray();
            if(query[0] === undefined && queryEmail[0] === undefined){
                console.log(req.body)
                if(req.body.user !== '' && req.body.password !== '' && req.body.email !== '' ){
                    collection.insertOne({
                        email: req.body.email,
                        user: req.body.user,
                        password: req.body.password
                    })
                    res.status(201).json({
                        message: 'Cadastrado com sucesso!',
                    });
                }else{
                    res.status(406).json({
                        message: 'Campos vazios nao sao permitidos',
                    });
                }
            }
            else{
                res.status(401).json({
                    message: "Usuario ja existente",
                })
            }
        }catch (error){
            //console.error('erro');
        }
    });
})

server.post('/login', (req, res, next) => {
    try {
        client.connect(async err => {
            const collection = client.db("kanban").collection("login");
            const query = await collection.find({user: req.body.user}).toArray();
            if(query[0] !== undefined){
                if(req.body.user === query[0].user && req.body.password === query[0].password){
                    const signatureUrl = autenticate(req.body.user, req.body.password);
                    res.status(202).json({
                        token: signatureUrl,
                    });
                }else{
                    res.status(406).json({
                        message: 'Senha incorreta',
                    });
                }
            }else{
                res.status(401).json({
                    message: 'Usuario não existe',
                });
            }
        });
    } catch (error) {
        console.error(error)
    } 
});

server.post('/createWorkspace', (req, res, next) => {
    try {
        client.connect(async err => {
            const collection = client.db("kanban").collection("workspaces");
            const query = await collection.find({userID: req.body.userID}).toArray();
            const queryEmail = await collection.find({nameProject: req.body.nameProject}).toArray();
            if(query[0] === undefined && queryEmail[0] === undefined){
                if(req.body.userID !== '' && req.body.nameProject !== '' && req.body.description !== '' ){
                    collection.insertOne({
                        userID: req.body.userID,
                        nameProject: req.body.nameProject,
                        description: req.body.description,
                    })
                    console.log('testes')
                    res.status(201).json({
                        message: 'Projeto cadastrado com sucesso!',
                    });
                }else{
                    res.status(406).json({
                        message: 'Houve algum erro',
                    });
                }
            }
        });
    } catch (error) {
        console.error(error)
    }
     
});
module.exports = server;
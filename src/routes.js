const {calcula} = require('./app');

const server = require('express').Router();
const bd = require('./banco');
const { autenticate } = require('./functions');

var i = 0;

server.get('/', (req, res) =>{
    try{
        res.status(404).send("<h3 align='center'>Page not Exists</h3>");
    }catch(error){
        res.status(404).send("<h3 align='center'>Page not Exists</h3>");
    }
})
server.post('/calcula', (req, res) => { 
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

server.post('/api/cadastrar', (req, res) =>{
    try{
        bd.schema.push({logins: req.body.user, senha: req.body.senha},);
        res.status(200).send(bd.schema.map((data)=>{
            return(
                `<p>Login: ${data.logins}</p>`+
                `<p>Senha: ${data.senha}</p>`
            )
        }).toString());
    }catch(error){
        res.status(201).send("<h3 align='center'>Page not Exists</h3>");
    }
})

server.post('/api/login', async (req, res) => {
    var mapeamento = bd.schema.map((data)=>{
        if(data.user === req.body.user && data.senha === req.body.password){
            var user = data;
            return user;
        }
        else{
            return false;
        }
        
    })

    if (mapeamento[0] !== false){
        res.status(202).send({
            message: "is Loged",
            jwt: autenticate(req.body.user, req.body.password),
        })
    }else{
        res.status(406).send({
            message: "not Loged",
        })
    }
});
module.exports = server;
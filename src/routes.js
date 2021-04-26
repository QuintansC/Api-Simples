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

server.get('/calcula', (req, res) =>{
    try{
        bd.schema.push({logins: `gustavo${i++}`, senha: '123456'},);
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

server.post('/login', async (req, res) => {
    const user = req.body.login;
    const pass = req.body.password;

    var mapeamento = bd.schema.map((data)=>{
        if(data.logins === user && data.senha === pass){
            var user = data;
        }
        return user;
    })

    if (mapeamento[0] !== false){
        res.status(200).send({
            message: "is Loged",
            jwt: autenticate(user, pass),
        })
    }else{
        res.status(400).send({
            message: "not Loged",
        })
    }
});
module.exports = server;
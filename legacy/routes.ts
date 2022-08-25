import { Router, Request, Response } from 'express';

const { calcula } = require('./app');
const { autenticate } = require('./functions');
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.URL_COMPLETA;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const server = Router()

server.get('/', (res: Response) =>{
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

server.post('/calcula', (req: Request, res: Response) => { 
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
module.exports = server;
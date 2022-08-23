const express = require('express');
const routes = require('./routes.ts')

class FaleMais {
    constructor(){
        this.express = express();
        this.middleware();
    }
    
    middleware(){
        this.express.use(express.json());
        this.express.use(require('cors')());
        this.express.use(routes);
    }

    calcula(origem, destino, minutos, plano){
        const definirCaminho = require('./functions.js').definirCaminho;
        return definirCaminho(origem, destino, minutos ,plano);
    }
} 

module.exports = {
    server: new FaleMais().express,
    calcula: new FaleMais().calcula
}
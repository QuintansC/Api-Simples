const express =  require('express');
class FaleMais {
    constructor(){
        this.express = express();

        this.middleware();
        this.calcula();
    }
    
    middleware(){
        this.express.use(express.json());
        this.express.use(require('cors')());
    }

    calcula(origem, destino, minutos,plano){
        const definirCaminho = require('./functions.js').definirCaminho;
        return definirCaminho(origem, destino, minutos ,plano);
    }
} 

module.exports = {
    server: new FaleMais().express,
    calcula: new FaleMais().calcula,
}
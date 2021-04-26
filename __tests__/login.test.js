const request = require('supertest');
const app = require('express');


test('Testa a rota login', ()=>{
    const res = new Promise(()=>request(app).post('/login')
    .send({
        origem: 'admin',
        destino: '123456',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    )
})



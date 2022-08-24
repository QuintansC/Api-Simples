const calcula = require('../legacy/app.js').calcula;

const request = require('supertest');
const app = require('express');

test('Retorna o valor do calculo de acordo com o plano e Os DDDs', () => {
  expect(calcula('011','016', 15, 30)).toStrictEqual({adicional: 31.35 , total: 88.35, valorInicial: 57});
})

test('Mesma teste que o de cima, mas sem saber o resultado', () => {
  expect(calcula('011','016', 15, 30)).toBeTruthy();
})

test('Testa a rota calcula', ()=>{
    const res = new Promise(()=>request(app).post('/calcula')
    .send({
        origem: '016',
        destino: '011',
        minutos: 15,
        plano: 30,
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    )
})



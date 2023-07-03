import request from 'supertest';
import { createServer } from '../src/utils/createServer'

const app = createServer()

describe('Testes de API ', ()=>{
    it("Testando a Rota Home da Aplicação ", async ()=>{
        expect(
            await request(app).get('/')
            .expect(200)
            .then(response => response.body.message)
        )
        .toEqual('Success')
    })
})
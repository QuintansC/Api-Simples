const calcula = require('../src/functions.js').calcularMinutesIncrement;

test('Testando sabendo os valores de retorno', () => {
  expect(calcula(1.9,15,30)).toStrictEqual({adicional: 31.35 , total: 88.35, valorInicial: 57});
})

test('Testando sem saber o valor de retorno', () => {
    expect(calcula(1.9,15,30)).toBeTruthy();
  })




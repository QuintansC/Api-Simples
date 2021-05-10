//Usa a biblioteca de criptografia padrão do node
const crypto = require('crypto');

//arredonda pra o tanto de casas decimais desejadas
const round = (num, places) => {
	if (!("" + num).includes("e")) {
		return +(Math.round(num + "e+" + places)  + "e-" + places);
	} else {
		let arr = ("" + num).split("e");
		let sig = ""
		if (+arr[1] + places > 0) {
			sig = "+";
		}

		return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places) + "e-" + places));
	}
}
//valores de acordo com o plano
function calcularMinutesIncrement(number, minutes, plano) {
    var calculo = (number * plano);
    var result = (calculo * 0.1)+calculo;
    var adicional = (result/plano)*minutes;

    return {
        valorInicial: calculo,
        total: round(calculo+adicional, 2),
        adicional: round(adicional, 2)
    };
}
function definirCaminho(origem, destino, minutos, plano){
    if(origem === '011'){
        return testDestinos(destino, minutos,plano);
    }

    if(destino === '011'){
        return testOrigens(origem, minutos,plano);
    }   
}
function testDestinos(destino, minutes, plano) {
    switch (destino) {
        case '016':
            return calcularMinutesIncrement(1.9, minutes,plano);
            break;
        case '017':
            return calcularMinutesIncrement(1.7, minutes, plano);
            break;
        case '018':
            return calcularMinutesIncrement(0.9, minutes, plano);
            break;
        default:
            
    }   
}
function testOrigens(origem, minutes, plano) {
    switch (origem) {
        case '016':
            return calcularMinutesIncrement(2.9, minutes, plano);
            break;
        case '017':
            return calcularMinutesIncrement(2.7, minutes, plano);
            break;
        case '018':
            return calcularMinutesIncrement(1.9, minutes, plano);
            break;
        default:
            
    }
}

function autenticate (user, password){
    //Inicio JWT
    const header = JSON.stringify({
        'alg': 'HS256',
        'typ': 'JWT'
      });

      const payload = JSON.stringify({
        'email':user,
        'password':password
      });

      const base64Header = Buffer.from(header).toString('base64').replace(/=/g, '');
      const base64Payload = Buffer.from(payload).toString('base64').replace(/=/g, '');
      const secret = 'hash-criptografada';
  
      const data = base64Header + '.' + base64Payload;
  
      const signature = crypto
          .createHmac('sha256', secret)
          .update(data)
          .digest('base64');
  
      const signatureUrl = signature
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '')
      //fim do JWT

      return signatureUrl;
}

module.exports = {
    definirCaminho: definirCaminho,
    calcularMinutesIncrement: calcularMinutesIncrement,
    autenticate: autenticate,
}
;
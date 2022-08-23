import crypto from 'crypto'
export function autenticate (user: string, password: string){
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

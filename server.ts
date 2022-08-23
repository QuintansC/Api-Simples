const port = process.env.PORT || 5000;
const {server} = require('./src/app');

server.listen(port, () => console.log(`Escutando a porta ${port}`));
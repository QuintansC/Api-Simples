const port = process.env.PORT || 5000;
const {server} = require('./src/app');
const routes = require('./src/routes.js');

server.use(routes);

server.listen(port, () => console.log(`Escutando a porta ${port}`));
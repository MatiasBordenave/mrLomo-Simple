const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Asegúrate de que 'db.json' tenga los datos de la fake API.
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = 5000; // Puerto que utilizará Vercel
server.listen(port, () => {
  console.log('JSON Server is running');
});

import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname no está disponible en módulos ES, entonces necesitas crearlo manualmente.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.resolve('/api/db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

server.get('/', (req, res) => {
  res.json({ message: 'Welcome <br/> Bordenave Matias Dev <br> ' });
});
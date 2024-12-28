const jsonServer = require('json-server');
const cors = require('cors'); // Añadimos CORS para evitar problemas con el acceso
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Usa tu archivo db.json
const middlewares = jsonServer.defaults();

// Habilitar CORS con restricciones de dominio
server.use(cors({
    origin: 'https://tudominio.com'  // Cambia esto por el dominio de tu app
}));

// Usar middlewares predeterminados de json-server
server.use(middlewares);

// Configurar el router de json-server
server.use(router);

// Escuchar en el puerto 3002
server.listen(3002, () => {
  console.log('JSON Server está corriendo en http://localhost:3002');
});

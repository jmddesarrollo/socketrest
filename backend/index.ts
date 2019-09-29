import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

// const server = new Server();
const server = Server.instance;

// Middleware: Antes de recibir http se lanza lo que le indiquemos aquí.
// Método que se ejecuta antes de que llegue a un controlador. 
// Recibe datos por método HTTP.
// Convierte datos recibidos en petición a objeto JSON, a un objeto javascript listo para usar.
server.app.use(bodyParser.urlencoded({ extended: false }));
server.app.use(bodyParser.json());
//

// CORS
server.app.use( cors({origin: true, credentials: true}) );

server.app.use('/', router);

server.start(() => {
    console.log(`El servidor está corriendo en el puerto ${server.port}`);
});

import express from 'express';
import { SERVER_PORT } from '../global/environment';

import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/sockets';

export default class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.listenSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private listenSockets() {
        console.log('Escuchando conexiones Sockets');
        this.io.on('connection', cliente => {
            console.log(cliente.id);
            // Conectar cliente
            socket.conectarCliente(cliente);            

            socket.confUsuario(cliente, this.io);

            socket.mensaje(cliente, this.io);
            
            socket.desconectar(cliente);
        });
    }

    start(callback: any) {
        // this.app.listen(this.port, callback);
        this.httpServer.listen(this.port, callback);
    }
}

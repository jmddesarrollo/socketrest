import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado');
        usuariosConectados.eliminarUsuario(cliente.id);
    });
}

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: {de: string, cuerpo: string, para: string} ) => {
        console.log('Mensaje recibido', payload);

        io.emit('newMessage', payload);
    });   
}

export const confUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: any ) => {
        console.log('Usuario', payload.nombre);

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado ` 
        });
    });    
}

export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}
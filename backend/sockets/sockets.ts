import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);    
}

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado');
        usuariosConectados.eliminarUsuario(cliente.id);

        io.emit('usuarios-activos', usuariosConectados.obtenerListaUsuarios());
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

        io.emit('usuarios-activos', usuariosConectados.obtenerListaUsuarios());         
        
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado ` 
        });
    });      
}

/**
 * Enviar información de los usuarios activos al cliente que lo solicita
 */
export const obtenerUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.obtenerListaUsuarios());
    });      
}

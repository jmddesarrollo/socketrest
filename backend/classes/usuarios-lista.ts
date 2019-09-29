import { Usuario } from "./usuario";

export class UsuariosLista {
    public listaUsuarios: Usuario[];

    constructor () {
        this.listaUsuarios = [];
    }

    /**
     * Agregar un usuario a la lista 
     */
    public agregar(usuario: Usuario) {
        this.listaUsuarios.push(usuario);
        console.log(this.listaUsuarios);

        return usuario;
    }

    /**
     * Actualizar el nombre de un usuario
     */
    public actualizarNombre(id: string, nombre: string) {
        const index = this.listaUsuarios.findIndex(usuario => usuario.id === id);
        this.listaUsuarios[index].nombre = nombre;	

        console.log('====Actualizando usuario =======');
        console.log(this.listaUsuarios);
    }

    /**
     * Obtener lista de usuarios
     */
    public obtenerListaUsuarios() {
        const listaUsuarios = this.listaUsuarios.filter(usuario => usuario.nombre !== 'sin-nombre');
        return listaUsuarios;
    }

    /**
     * Obtener un usuario
     */
    public obtenerUsuario(id: string) {
        return this.listaUsuarios.find(usuario => usuario.id === id);    
    }

    /**
     * Obtener usuarios en una sala
     */
    public obtenerUsuariosEnSala(sala: string) {
        return this.listaUsuarios.find(usuario => usuario.sala === sala);    
    }  
    
    /**
     * Eliminar un usuario
     */
    public eliminarUsuario(id: string) {
        const temporalUsuario = this.obtenerUsuario(id);
        this.listaUsuarios = this.listaUsuarios.filter(usuario => usuario.id !== id);

        console.log(this.listaUsuarios);
        return temporalUsuario;
    }
}
import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }

  sendMessage(mensaje: string) {
    const nombre = this.wsService.getUsuario().nombre;
    const payload = {
      de: nombre,
      cuerpo: mensaje,
      para: 'Todos'
    };

    this.wsService.emit('mensaje', payload);
  }

  getMessage() {
    return this.wsService.listen('newMessage');
  }

  getMessagePrivate() {
    return this.wsService.listen('mensaje-privado');
  }

  emitirUsuariosActivos() {
    this.wsService.emit('obtener-usuarios');
  }

  _getUsuariosActivos() {
    return this.wsService.listen('usuarios-activos');
  }

}

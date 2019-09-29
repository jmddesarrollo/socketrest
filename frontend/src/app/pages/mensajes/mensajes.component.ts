import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  public nombre: string;

  constructor(
    private wsService: WebsocketService
  ) {
    this.nombre = '';
  }

  ngOnInit() {
    this.nombre = this.wsService.usuario.nombre;
  }

}

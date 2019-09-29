import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private wsService: WebsocketService,
    private chatService: ChatService
  ) {

  // Escuha mensajes privados
  }

  ngOnInit() {
    this.chatService.getMessagePrivate().subscribe(msg => {
      console.log(msg);
    });
  }
}

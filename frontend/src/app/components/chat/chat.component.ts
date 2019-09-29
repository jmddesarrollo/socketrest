import { Component, OnInit, OnDestroy } from '@angular/core';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  public texto: string;
  public mensajes: any[];

  public elemento: HTMLElement;

  private observables = new Array();

  constructor(
    private chatService: ChatService
  ) {
    this.texto = null;
    this.mensajes = [];
  }

  ngOnInit() {
    this._getMessage();

    this.elemento = document.getElementById('chat-mensajes');
  }

  ngOnDestroy() {
    for (const ob of this.observables) {
      if (ob !== undefined && ob !== null) {
        ob.unsubscribe();
      }
    }
  }

  _getMessage() {
    const ob = this.chatService.getMessage().subscribe(data => {
      this.mensajes.push(data);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });

    this.observables.push(ob);
  }

  enviar() {
    if (this.texto.trim().length === 0) {
      return false;
    }

    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }

}

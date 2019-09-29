import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit, OnDestroy {
  public usuariosActivos: Observable<any>;
  private observables = new Array();

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this._getUsuarios();
    this.emitirUsuariosActivos();
  }

  ngOnDestroy() {
    for (const ob of this.observables) {
      if (ob !== undefined && ob !== null) {
        ob.unsubscribe();
      }
    }
  }

  emitirUsuariosActivos() {
    this.chatService.emitirUsuariosActivos();
  }

  _getUsuarios() {
    this.usuariosActivos = this.chatService._getUsuariosActivos();

    // const ob = this.chatService._getUsuariosActivos().subscribe((data) => {
    //   console.log(data);
    //   this.usuariosActivos = data;usuariosActivos
    // });

    // this.observables.push(ob);
  }

}

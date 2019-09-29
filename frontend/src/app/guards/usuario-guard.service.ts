import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuardService implements CanActivate {

  constructor(
    private wsService: WebsocketService,
    private router: Router
  ) { }

  canActivate() {
    if (this.wsService.getUsuario()) {
      return true;
    } else {
      this.router.navigateByUrl('');
      return false;
    }
  }
}

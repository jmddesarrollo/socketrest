import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public nombre: string;

  constructor(
    private wsService: WebsocketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.nombre = '';
  }

  ingresar() {
    this.wsService.loginWS(this.nombre)
      .then(() => {
        this.router.navigateByUrl('/mensajes');
      });
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

// Servicios
import { UsuarioGuardService } from './guards/usuario-guard.service';

// Componentes
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';

const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'mensajes', component: MensajesComponent, canActivate: [UsuarioGuardService]},
    {path: '**', component: LoginComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

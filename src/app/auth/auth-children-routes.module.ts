import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OlvidarPasswordComponent } from './olvidar-password/olvidar-password.component';
import { ConfirmarComponent } from './confirmar/confirmar.component';
import { NuevoPasswordComponent } from './nuevo-password/nuevo-password.component';
import { DobleAuthenticacionComponent } from './doble-authenticacion/doble-authenticacion.component';


const rutasHijasAuth:Routes = [
  { path:'registrar', component:RegisterComponent},
  { path:'login', component: LoginComponent},
  { path: 'dobleAuthenticacion', component: DobleAuthenticacionComponent},
  { path: 'confirmar/:tokenDoble', component:ConfirmarComponent},
  { path: 'olvide-password',component:OlvidarPasswordComponent},
  { path: 'nuevo-password/:tokenDoble', component: NuevoPasswordComponent}
]

@NgModule({
  imports: [RouterModule.forChild(rutasHijasAuth)],
  exports:[RouterModule]
})
export class AuthChildrenRoutesModule { }

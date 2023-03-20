import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RecaptchaFormsModule, RecaptchaModule, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { OlvidarPasswordComponent } from './olvidar-password/olvidar-password.component';
import { ConfirmarComponent } from './confirmar/confirmar.component';
import { NuevoPasswordComponent } from './nuevo-password/nuevo-password.component';
import { DobleAuthenticacionComponent } from './doble-authenticacion/doble-authenticacion.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OlvidarPasswordComponent,
    ConfirmarComponent,
    NuevoPasswordComponent,
    DobleAuthenticacionComponent,
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    DobleAuthenticacionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCaptchaModule,
    MatDialogModule    
  ], 
  providers: [
    { provide: MatDialogRef, useValue: {}},
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class AuthModule { }

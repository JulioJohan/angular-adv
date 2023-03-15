import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RecaptchaFormsModule, RecaptchaModule, RECAPTCHA_SETTINGS } from 'ng-recaptcha';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { OlvidarPasswordComponent } from './olvidar-password/olvidar-password.component';
import { ConfirmarComponent } from './confirmar/confirmar.component';
import { NuevoPasswordComponent } from './nuevo-password/nuevo-password.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OlvidarPasswordComponent,
    ConfirmarComponent,
    NuevoPasswordComponent,
  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCaptchaModule,

  ],  
})
export class AuthModule { }

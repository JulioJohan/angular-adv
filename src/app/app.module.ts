import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HospitalesComponent } from './pages/mantenimientos/hospitales/hospitales.component';
import { ImagenesPipe } from './pipes/imagen.pipe';
import { MedicoComponent } from './mantenimientos/medico/medico.component';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    HospitalesComponent,
    ImagenesPipe,
    MedicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PagesModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

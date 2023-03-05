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
import { MedicoComponent } from './pages/mantenimientos/medicos/medico.component';
import { MedicosComponent } from './pages/mantenimientos/medicos/medicos.component';
import { PipeModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    NopagefoundComponent,
    HospitalesComponent,    
    MedicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PipeModule,
   PagesModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

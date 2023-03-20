import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HospitalesComponent } from './pages/mantenimientos/hospitales/hospitales.component';
import { ImagenesPipe } from './pipes/imagen.pipe';
import { MedicoComponent } from './pages/mantenimientos/medicos/medico.component';
import { MedicosComponent } from './pages/mantenimientos/medicos/medicos.component';
import { PipeModule } from './pipes/pipes.module';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,    
    PagesModule,
    AuthModule,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

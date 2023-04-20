import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { AdminGuard } from '../guards/admin.guard';
import { BusquedaPaginasComponent } from './busqueda-paginas/busqueda-paginas.component';
import { RouterModule, Routes } from '@angular/router';
import { HospitalComponent } from './mantenimientos/hospitales/hospital.component';
import { MapasitioComponent } from './mapasitio/mapasitio.component';

const childRoutes:Routes = [
  { path: '', component: DashboardComponent,data:{titulo:'inicio',seccion:'Principal'}},
  { path: 'mapa-sitio',component: MapasitioComponent, data:{titulo:'mapa-sitio',seccion: 'Principal'}},
  { path: 'progress', component: ProgressComponent, data:{titulo:'Progress',seccion:'Principal'}},
  { path: 'grafica1', component: Grafica1Component,data:{titulo:'Grafica #1',seccion:'Principal'} },
  { path: 'ajustes', component: AccountSettingsComponent,data:{titulo:'ajustes',seccion:'Principal'} },
  { path: 'promesas',component:PromesasComponent,data:{titulo:'Promesas',seccion:'Principal'}},
  { path: 'rxjs',component:RxjsComponent, data:{titulo:'Rxjs',seccion:'Principal'}},
  { path: 'perfil',component:PerfilComponent, data:{titulo:'perfil',seccion:'Principal'}},
  { path: 'buscar/:termino',component:BusquedaComponent,data:{titulo:'Busqueda',seccion:'Principal'}},
  { path: 'busqueda/:termino',component: BusquedaPaginasComponent,data:{titulo:'Busqueda',seccion:'Principal'}},

  //Mantenimientos
  { path: 'hospitales',component:HospitalesComponent, data:{titulo:'hospitales',seccion:'Mantenimiento'}},
  { path: 'hospital/:id',component:HospitalComponent, data:{titulo:'hospitales',seccion:'Mantenimiento',subseccion: 'crear-actualizar'}},
  { path: 'médicos',component:MedicosComponent, data:{titulo:'médicos',seccion:'Mantenimiento'}},
  { path: 'medico/:id',component:MedicoComponent, data:{titulo:'medicos',seccion:'Mantenimiento',subseccion: 'crear-actualizar'}},
  
  //Rutas Admin
  { path: 'usuarios',canActivate:[AdminGuard], component:UsuariosComponent, data:{titulo:'usuarios',seccion:'Mantenimiento'}}
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }

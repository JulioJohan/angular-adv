import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private router:Router){}

  public menu:any = [];
  
  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')!);

    if(this.menu.length === 0){
      this.router.navigateByUrl('/login');
    }
  }

  // menu:any[] = [
  //   {
  //     titulo:'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu:[
  //       {titulo:'Main',url: '/'},
  //       {titulo:'ProgressBar',url: 'progress'},
  //       {titulo:'Graficas',url: 'grafica1'},
  //       {titulo:'Promesas',url: 'promesas'},
  //       {titulo:'Rxjs',url: 'rxjs'},
  //     ]
  //   },
  //   {
  //     titulo:'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu:[
  //       {titulo:'Usuarios',url: 'usuarios'},
  //       {titulo:'Hospitales',url: 'hospitales'},
  //       {titulo:'Medicos',url: 'medicos'}       
  //     ]
  //   }
  // ];



}

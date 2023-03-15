import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit{

  constructor(private usuarioService:UsuarioService){}

  tokenActualizado = false;
  menu:any = []
  principal:any = []
  mantenimiento:any = []
  ngOnInit(): void {
    this.menu = JSON.parse(localStorage.getItem('menu')!);
    this.filtrarPorTituloMenu()
    this.usuarioService.tokenExpirado();

  }

  filtrarPorTituloMenu(){
    this.principal =  this.menu[0].submenu;    
    this.mantenimiento = this.menu[1].submenu;
  }
  

}

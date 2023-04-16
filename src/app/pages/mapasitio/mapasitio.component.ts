import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mapasitio',
  templateUrl: './mapasitio.component.html',
  styleUrls: ['./mapasitio.component.css']
})
export class MapasitioComponent implements OnInit {

  constructor(private usuarioService:UsuarioService){}

  tokenActualizado = false;
  menu:any = []
  principal:any = []
  mantenimiento:any = []
  ngOnInit(): void {
    this.menu = JSON.parse(localStorage.getItem('menu')!);
    this.filtrarPorTituloMenu()
  }

  filtrarPorTituloMenu(){
    this.principal =  this.menu[0].submenu;    
    this.mantenimiento = this.menu[1].submenu;
  }
}

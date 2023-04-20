import { Component, HostListener, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';
import { UsuarioService } from '../services/usuario.service';

declare function customInitFunction():any
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit{

  public fecha!:Date;
  constructor(private settingsService:SettingsService,
              private sidebarService:SidebarService,
              private usuarioService:UsuarioService){}


  ngOnInit(): void {
    customInitFunction();  
    this.sidebarService.cargarMenu()
    // this.verificarTiempoToken();
    this.verificarTiempoToken();
  }

  @HostListener('window:unload', ['$event'])
  clearLocalStorage(event:any) {
      this.usuarioService.cerrarSesion();
    
  }
  
  
  verificarTiempoToken(){
    // setTimeout(()=>{
      console.log("hola token")
      this.usuarioService.tokenExpirado()
      // agregar aquí la llamada a la función para que se llame cada segundo
      // this.usuarioService.pararTiempoVerificacion()
    // },60000)
  }






}

import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems:any[] = [];
  // public imagen!:string;
  public usuario!:Usuario
  
  constructor(public sidebarService:SidebarService,private usuarioService:UsuarioService){
    // this.menuItems = sidebarService.menu;
    
  }
  ngOnInit(): void {
    console.log(this.menuItems);
    this.usuario = this.usuarioService.usuario; 
   }

   logout(){
    this.usuarioService.ngOnDestroy()
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('fechaExpiracion');
    this.usuarioService.logout()
    
  }

}

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { enviroment } from 'src/app/environments/enviroment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})

export class HeaderComponent implements OnInit{
  public base_url = enviroment.base_url;
  
  public usuario!:Usuario;
  public imagen:any = '';


  constructor(private usuarioService:UsuarioService,
             private router:Router)
  {
  }
  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    console.log("imagenUrL"+this.usuario.imagenURL);
    console.log(this.usuario)
  }

  

  logout(){
    this.usuarioService.pararTiempoVerificacion()
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('fechaExpiracion');
    this.usuarioService.logout()
    
  }

  buscar(termino:string){
    if(termino.length == 0){
      return;
    }
    this.router.navigateByUrl(`/dashboard/busqueda/${termino}`)
  }
}

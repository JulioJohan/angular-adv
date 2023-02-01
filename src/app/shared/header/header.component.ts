import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit{

  
  public usuario!:Usuario;

  constructor(private usuarioService:UsuarioService,
             private router:Router)
  {
  }
  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    console.log(this.usuario);
  }

  logout(){
    this.usuarioService.logout()
  }

  buscar(termino:string){
    if(termino.length == 0){
      this.router.navigateByUrl('/dashboard')
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`)
  }
}

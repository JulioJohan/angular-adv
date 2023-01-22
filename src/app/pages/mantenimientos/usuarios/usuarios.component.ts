import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios:number = 0;
  public usuarios:Usuario [] = [];
  public desde:number = 0;

  constructor(private usuarioService:UsuarioService){

  }
  ngOnInit(): void {
    this.obtenerTodos();
  }
  obtenerTodos(){
    this.usuarioService.obtenerUsuarios(this.desde).subscribe(({total,usuarios})=>{
      this.usuarios = usuarios
      this.totalUsuarios = total;
    });
  }

  cambiarPagina(valor:number){
    this.desde += valor;
    if(this.desde < 0){
      this.desde = 0;
    }
  }
}

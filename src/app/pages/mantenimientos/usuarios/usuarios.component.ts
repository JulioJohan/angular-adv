import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit,OnDestroy {

  public totalUsuarios:number = 0;
  public usuarios:Usuario [] = [];
  public usuariosTemp:Usuario [] = [];
  public imagenSubida!:Subscription;
  public desde:number = 0;
  public cargando:boolean =false;

  constructor(private usuarioService:UsuarioService,
              private busquedasService:BusquedasService,
              private modalImagenService:ModalImagenService){

  }
  ngOnDestroy(): void {
   this.imagenSubida.unsubscribe();
  }
  ngOnInit(): void {
    this.usuarioService.tokenExpirado();
    this.obtenerTodos();
    //cuando cambio la imagen llamamos a obtener todos
    this.imagenSubidaMetodo();
    
  }
  imagenSubidaMetodo(){
    this.imagenSubida = this.modalImagenService.nuevaImagen.pipe(delay(100))
    .subscribe(img => {
      
      this.obtenerTodos()
    })
  }
  obtenerTodos(){
    this.cargando = true;
    this.usuarioService.obtenerUsuarios(this.desde).subscribe(({total,usuarios})=>{
      console.log(usuarios)
      this.usuarios = usuarios;
      this.totalUsuarios = total;
      this.usuariosTemp =usuarios;
      this.cargando = false;
    });
  }

  cambiarPagina(valor:number){
    this.desde += valor;
    if(this.desde < 0){
      this.desde = 0;
    }else if(this.desde > this.totalUsuarios){
      this.desde -= 5;
    }
    this.obtenerTodos();
  }

  buscar(termino:string){
    if(termino.length === 0){
      return this.usuarios = this.usuariosTemp;
    }else {
      return this.busquedasService.buscar('usuarios',termino).subscribe(resp =>{
        this.usuarios = resp
      })
    }
   
  }

  eliminarUsuario(usuario:Usuario){
    console.log(usuario)
    if(usuario.uid === this.usuarioService.uid){
      Swal.fire('Error','No puede borrarse a si mismo','error');
      return;
    }
    Swal.fire({
      title: 'Borrar Usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
       this.usuarioService.eliminarUsuario(usuario).subscribe(resp=>{
          Swal.fire('Usuario Borrado',`${usuario.nombre} fue eliminado correctamente`,'success');
          this.obtenerTodos();

       });
      }
    })
  }

  cambiarRole(usuario:Usuario){
    this.usuarioService.guardarUsuario(usuario).subscribe(resp =>{
      console.log(resp)
    })
  }

  abrirModal(usuario:Usuario){
    this.modalImagenService.abrirModal('usuarios',usuario.uid!,usuario.img);
  }
}


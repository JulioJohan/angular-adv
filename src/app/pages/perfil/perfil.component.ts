import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';
import { ReadVarExpr } from '@angular/compiler';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario
  public imagenSubir!: File
  public imagenTemp!: string | ArrayBuffer | null;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {
    this.usuario = this.usuarioService.usuario;
    console.log(this.usuario);
  }

  ngOnInit(): void {
    this.perfilForm = this.formBuilder.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      role: this.usuario.getRole
    });

  }



  actualizarPerfil() {
    const nombre = this.perfilForm.value.nombre.length
    if (nombre < 6) {
      Swal.fire(
        'Campo invalido',
        'Ingresa un nombre valido',
        'error'
      )
      return;
    }
    if (this.perfilForm.value.nombre === this.usuario.nombre && this.perfilForm.value.email === this.usuario.email) {
      Swal.fire(
        'No existe ningun cambio',
        '',
        'error'
      )
      return;
    }
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(resp => {
      const { email, nombre } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      this.perfilForm.reset();
      // console.log(resp)
      Swal.fire(
        'Actualizado Correctamente',
        '',
        'success'
      )
    },(error =>{
       Swal.fire('Error',error.error.msg,'error')
    }))
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;
    if (!file) {
      return this.imagenTemp = null;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.imagenTemp = reader.result;
      }
      return this.imagenTemp;
    }

    // console.log(event)
    // this.fileUploadService.actualizarFoto()
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!).
    then(img => {
      this.usuario.img = img;
      Swal.fire('Imagen Actualizada','','success')
    }).catch(error =>{
      Swal.fire('Error','No se pudo guardar la imagen','error')
    })
  }


}

import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {
  public imagenSubir!: File;
  public imagenTemp!: string | ArrayBuffer | null;


  //public para poder hacer referencia al html
  constructor(public modalImagenService:ModalImagenService,
              private fileUploadService:FileUploadService){}

  cerrarModal(){
    this.imagenTemp = null;
    this.modalImagenService.cerrarModal();
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
    const id = this.modalImagenService.id;
    const tipo:'usuarios' | 'medicos' | 'hospitales' = this.modalImagenService.tipo;
    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo,id).
    then(img => {
      Swal.fire('Imagen Actualizada','','success');
      this.modalImagenService.nuevaImagen.emit(img)
      this.cerrarModal()
    }).catch(error =>{
      Swal.fire('Error','No se pudo guardar la imagen','error')
    })
  }

}

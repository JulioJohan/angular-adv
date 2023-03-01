import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medicos.model';
import { MedicoService } from '../../../services/medico.service';
import { delay, Subscription } from 'rxjs';
import { ModalImagenComponent } from 'src/app/components/modal-imagen/modal-imagen.component';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
})
export class MedicosComponent implements OnInit,OnDestroy{

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs!: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService:BusquedasService
  ){

  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
      this.cargarMedicos();

      this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarMedicos());
  }

  cargarMedicos (){
    this.cargando=true;
    this.medicoService.cargarMedicos( )
    .subscribe(medicos =>{
      this.cargando = false;
      this.medicos = medicos;
    })
  }

  abrirModal(medico: Medico){
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino:string){
    if(termino.length === 0){
      return this.cargarMedicos;
    }
      return this.busquedasService.buscar('medicos',termino).subscribe(resp=>{
        this.medicos = resp;
      })
   
  }

  borrarMedico(medico: Medico){

    Swal.fire({
      title: '¿Borrar Medico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
       this.medicoService.eliminarMedico(medico._id).subscribe(resp=>{
          Swal.fire('Medico Borrado',`${medico.nombre} fue eliminado correctamente`,'success');
          this.cargarMedicos();

       });
      }
    })

  }
}
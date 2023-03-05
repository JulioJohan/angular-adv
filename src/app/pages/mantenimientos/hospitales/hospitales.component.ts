import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ImagenesPipe } from 'src/app/pipes/imagen.pipe';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html'
})
export class HospitalesComponent implements OnInit,OnDestroy{
  
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription;

  constructor (
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService){ 
    
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe(img => this.cargarHospitales());

}

buscar(termino:string){
  if(termino.length === 0){
    return this.cargarHospitales;
  }
    return this.busquedasService.buscar('hospitales',termino).subscribe(resp=>{
      this.hospitales = resp;
    })
 
}

  cargarHospitales(){
    this.cargando = true;

    this.hospitalService.cargarHospital()
    .subscribe (hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
    })
  }

  guardarCambios( hospital: Hospital ){   
    if(hospital.nombre === "" || hospital.nombre.length <= 4){
      Swal.fire('Nombre Invalido','Ingresa al menos un nombre mayor de cinco caracteres','error');
      return;
    }
    this.hospitalService.actualizarHospital( hospital._id, hospital.nombre ).subscribe( resp => {
      Swal.fire( 'Actualizado', hospital.nombre, 'success' )
    })

  }

  eliminarHospital( hospital: Hospital ){

    this.hospitalService.eliminarHospital( hospital._id).subscribe( resp => {
      this.cargarHospitales();
      Swal.fire( 'Borrado', hospital.nombre, 'success' )
    })

  }

  async abrirSweetAlert(){
    const {value = ''} = await Swal.fire<string>({
    //const {value} = await Swal.fire({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })

    if(value.trim().length > 0){
      this.hospitalService.crearHospital(value)
      .subscribe ((resp: any) => {
        this.hospitales.push (resp.hospital)
      })
    }

  }

  abrirModal(hospital: Hospital){
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

}

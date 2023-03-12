import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from 'src/app/models/medicos.model';
import { ImagenesPipe } from 'src/app/pipes/imagen.pipe';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',

})
export class MedicoComponent implements OnInit{

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public medicoSeleccionado!: Medico;
  public hospitalSeleccionado!: Hospital;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService : MedicoService,
    private usuarioService:UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){

  }
  
  ngOnInit(): void {

    this.activatedRoute.params
    .subscribe( ({id}) => this.cargarMedico(id));

    this.medicoForm = this.fb.group({
      nombre: ['',Validators.required],
      hospital: ['',Validators.required]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
        .subscribe( hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId )!;
        })
        this.usuarioService.tokenExpirado();
  }

  cargarMedico(id: string){

    if(id == 'nuevo'){
      return;
    }

    this.medicoService.obtenerMedicoPorId(id)
    .pipe(
      delay(100)
    )
    .subscribe(medico =>{

      if(!medico){
        this.router.navigateByUrl(`/dashboard/medico`)

      }

      const {nombre,hospital: {_id}} = medico;

      this.medicoSeleccionado = medico;
      this.medicoForm.setValue({nombre, hospital: _id})

    });
  }

  cargarHospitales(){
    
    this.hospitalService.cargarHospital()
    .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
    })
  }

  guardarMedico(){

  if(this.medicoSeleccionado){
    const nombre = this.medicoSeleccionado.nombre
    console.log(this.medicoSeleccionado)
    //actualizar
    const data ={
      ...this.medicoForm.value,
      _id: this.medicoSeleccionado._id
    }
    this.medicoService.actualizarMedico(data)
    .subscribe(resp =>{
      Swal.fire('Actualizado', `Actualizado correctamente`,'success');
    })
    
  }else{
    //crear
    const { nombre } = this.medicoForm.value;
    this.medicoService.crearMedicos(this.medicoForm.value)
    .subscribe ((resp: any) => {

      Swal.fire('Creado', `${ nombre } creado correctamente`,'success');
      this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)

    })
  }
  }

    

}

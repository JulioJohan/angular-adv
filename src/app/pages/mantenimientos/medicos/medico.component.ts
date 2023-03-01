import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',

})
export class MedicoComponent implements OnInit{

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado!: Hospital;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService
    ){

  }
  
  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ['Hernando',Validators.required],
      hospital: ['',Validators.required]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
    .subscribe( hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId)
    })

  }

  cargarHospitales(){
    this.hospitalService.cargarHospital()
    .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
    })
  }

}

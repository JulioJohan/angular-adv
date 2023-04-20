import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {


  public hospitalFormulario!:FormGroup;
  public ciudadesGuanajuato = ["León", "Guanajuato", "Irapuato", "Celaya", "Silao", "San Miguel de Allende", "Salamanca", "Dolores Hidalgo", "Acámbaro", "Valle de Santiago", "San Francisco del Rincón", "Pénjamo", "Purísima del Rincón", "Cortazar", "Lagos de Moreno", "Moroleón", "Romita"];

  public hospitalSeleccionado!: Hospital;

  public archivo!:File;;
  public nombreArchivo:string = '';
  public fechaInaguracion:string = '';



  constructor(private formBuilder:FormBuilder,
    private hospitalService: HospitalService,
    private medicoService : MedicoService,
    private modalImagenService: ModalImagenService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){}
  
  ngOnInit(): void {

    this.activatedRoute.params
    .subscribe( ({id}) => this.cargarHospital(id));
    let objetoJSON: any; // declare the variable before using it

    this.hospitalFormulario = this.formBuilder.group({
      nombre:['',Validators.required],
      ciudad: ['',Validators.required],
      domicilio: ['',Validators.required],
      numeroTelefono: [null,Validators.required],
      fechaInaguracion: ['',Validators.required],
      img:[]
    })
  }


  cargarHospital(id: string){
    if(id == 'nuevo'){
      return;
    }

    this.hospitalService.obtenerPorId(id).pipe(
      delay(1000)
    ).subscribe(hospital => {
      if(!hospital){
        this.router.navigateByUrl(`/inicio/hospitales`)
      
      }
  
      const {nombre, ciudad, domicilio,numeroTelefono, fechaInaguracion ,img} = hospital;



      const fecha = new Date(fechaInaguracion);
      const fechaEnFormatoCorrecto = `${fecha.getFullYear()}-${("0" + (fecha.getMonth() + 1)).slice(-2)}-${("0" + fecha.getDate()).slice(-2)}`;

      this.hospitalSeleccionado = hospital;

      this.hospitalFormulario.patchValue({
        fechaInaguracion:fechaEnFormatoCorrecto,
        nombre:nombre,
        ciudad:ciudad,
        domicilio:domicilio,
        numeroTelefono:numeroTelefono,
        img:img        
        
      })
      // this.hospitalFormulario.setValue({nombre , ciudad,domicilio, numeroTelefono ,img})

    })
    
  }

  abrirModal(evento:any){
    this.archivo = evento.target!.files[0];
    console.log(this.archivo)
    if(!this.archivo.type.startsWith('image/')){
      Swal.fire('Imagen', `Escoge un archivo correcto`,'error');
      return;
    }  
  }

  validaciones():boolean{
    if(this.hospitalFormulario.value.nombre === ""){
      Swal.fire('Nombre', `El nombre del medico es obligatorio`,'error');
      return false;
    }

    if(this.hospitalFormulario.value.ciudad === ""){
      Swal.fire('Especialidad ', `La especialidad es obligatorio`,'error');
      return false;
    }
    if(this.hospitalFormulario.value.domicilio === "" ){
      Swal.fire('Nombre', `El Numero de Telefono del medico es incorrecto`,'error');
      return false;
    }
    if(this.hospitalFormulario.value.numeroTelefono.toString().length  != 10){
      Swal.fire('Telefono', `El numero de telofono es incorrecto`,'error');
      return false;
    }
    if(this.hospitalFormulario.value.fechaInaguracion === ""){
      Swal.fire('Nombre', `El Area del medico es incorrecto`,'error');
      return false;
    }   
    return true;
  }

  guardarHospital(){

    
    if(this.hospitalSeleccionado){
      // const nombre = this.hospitalSeleccionado.nombre
      console.log(this.hospitalSeleccionado)
      //actualizar
  
      if(this.archivo != null){    
        this.medicoService.actualizarImagen(this.archivo,'hospitales',this.hospitalSeleccionado._id).subscribe((data:any)=>{
          this.hospitalFormulario.value.img = data.nombreArchivo;
        });
      }
      console.log(this.hospitalFormulario.value.img);
    
      setTimeout(()=>{
      const data ={
        ...this.hospitalFormulario.value,
        _id: this.hospitalSeleccionado._id
      }
      
        this.hospitalService.actualizarHospital(data)
        .subscribe(resp =>{
          Swal.fire('Actualizado', `Actualizado correctamente`,'success');
          this.router.navigateByUrl(`/inicio/hospitales`);
        })
      },2000)
      
      
    }else{
      //crear
      let {  especialidad,numeroTelefono,area,aniosExperiencia,hospital} = this.hospitalFormulario.value;
  
    
      if(!this.validaciones()){
        return;
      };
      
      console.log(this.hospitalFormulario.value)
      const fechaString:string = new Date(this.hospitalFormulario.value.fechaInaguracion).toISOString();
      this.hospitalFormulario.value.fechaInaguracion = fechaString
      console.log(this.hospitalFormulario.value)
      if(this.archivo != null){
        this.medicoService.guardarImagen(this.archivo,'hospitales').subscribe((data:any)=>{  
        
          console.log(data);
          this.nombreArchivo = data.nombreArchivo;
        })
      }
      
      console.log("nombreArchivo"+this.nombreArchivo)
  
      setTimeout(()=>{
        this.hospitalFormulario.value.img = this.nombreArchivo;
        this.hospitalService.crearHospital(this.hospitalFormulario.value)
        .subscribe ((resp: any) => {
          
          Swal.fire('Creado', ` correctamente`,'success');
          this.router.navigateByUrl(`/inicio/hospitales`)
    
        })
      },2000)
      
    }
    }
}

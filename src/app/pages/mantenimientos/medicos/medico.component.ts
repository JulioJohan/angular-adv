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
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { enviroment } from 'src/app/environments/enviroment';
import { FileUploadService } from 'src/app/services/file-upload.service';


const base_url = enviroment.base_url;

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls:['./medicos.component.css']

})
export class MedicoComponent implements OnInit{

  

  public medicoForm!: FormGroup;
  public medicoFormGuardar!: FormGroup;

  public hospitales: Hospital[] = [];
  public medicoSeleccionado!: Medico;
  public hospitalSeleccionado!: Hospital;
  public nombreArchivo:string = '';

  public especialidades:string[] = ["Anestesiología", "Cardiología", "Cirugía General", "Dermatología", "Endocrinología", "Gastroenterología", "Geriatría", 
  "Hematología", "Infectología", "Medicina de Emergencias", "Medicina Familiar", "Medicina Interna", "Nefrología", "Neurología", "Obstetricia y Ginecología",
   "Oncología", "Oftalmología", "Ortopedia", "Otorrinolaringología", "Pediatría", "Psiquiatría", "Radiología", "Reumatología", "Traumatología", "Urología"];

  public areas:string[] = ["Atención médica directa", "Gestión de casos clínicos", "Educación médica continua", "Investigación clínica",
   "Administración de hospitales y clínicas", "Gestión de prácticas médicas", "Gestión de la calidad en la atención médica", 
   "Gestión de riesgos y seguridad en la atención médica", "Tecnología de la información en la atención médica", "Desarrollo de políticas de atención médica", 
   "Gestión de recursos humanos en la atención médica", "Facturación y gestión de seguros médicos", "Comunicaciones y relaciones públicas en la atención médica"];
  public archivo!:File;;
   
  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService : MedicoService,
    private usuarioService:UsuarioService,
    private modalImagenService: ModalImagenService,
    private fileUploadService:FileUploadService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){

  }
  
  ngOnInit(): void {

    this.activatedRoute.params
    .subscribe( ({id}) => this.cargarMedico(id));

    this.medicoForm = this.fb.group({
      nombre: ['',Validators.required],
      especialidad:['',Validators.required],
      numeroTelefono:[null,Validators.required],
      area:['',Validators.required],
      aniosExperiencia:[null,Validators.required],
      hospital: ['',Validators.required],
      img:['']     
    });

    // this.medicoFormGuardar = this.fb.group({
    //   nombre: ['',Validators.required],
    //   especialidad:['',Validators.required],
    //   numeroTelefono:[null,Validators.required],
    //   area:['',Validators.required],
    //   aniosExperiencia:['',Validators.required],
    //   hospital: ['',Validators.required],
    //   img:['']     
    // });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
        .subscribe( hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId )!;
        })
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
        this.router.navigateByUrl(`/dashboard/medicos`)

      }

      const {nombre,especialidad, numeroTelefono, area,aniosExperiencia, hospital: {_id},img} = medico;
      console.log(medico)

      this.medicoSeleccionado = medico;
      console.log(this.medicoSeleccionado)
      this.medicoForm.setValue({nombre, especialidad , numeroTelefono, area ,aniosExperiencia, hospital: _id,img})
      console.log(this.medicoForm.value)

    });
  }

  cargarHospitales(){
    
    this.hospitalService.cargarHospital()
    .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
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

  // async actualizarImagen(medicoId:string) {
  //   const nombreArchivo = await this.fileUploadService.actualizarFoto(this.archivo, 'medicos', medicoId);
  //   return nombreArchivo;
  // }

  validaciones():boolean{
    if(this.medicoForm.value.nombre === ""){
      Swal.fire('Nombre', `El nombre del medico es obligatorio`,'error');
      return false;
    }

    if(this.medicoForm.value.especialidad === ""){
      Swal.fire('Especialidad ', `La especialidad es obligatorio`,'error');
      return false;
    }
    if(this.medicoForm.value.numeroTelefono === null ){
      Swal.fire('Nombre', `El Numero de Telefono del medico es incorrecto`,'error');
      return false;
    }
    if(this.medicoForm.value.numeroTelefono.toString().length  != 10){
      Swal.fire('Telefono', `El numero de telofono es incorrecto`,'error');
      return false;
    }
    if(this.medicoForm.value.area === ""){
      Swal.fire('Nombre', `El Area del medico es incorrecto`,'error');
      return false;
    }
    if(this.medicoForm.value.aniosExperiencia === null){
      Swal.fire('Años de experiencia', `Los Años de experiencia es obligatorio`,'error');
      return false;
    }

    if(this.medicoForm.value.hospital === ''){
      Swal.fire('Hospital', `Para un medico debes agregar el hospital`,'error');
      return false;
    }
    if(this.medicoForm.value.aniosExperiencia.toString().length > 50){
      Swal.fire('Años de experiencia ', `Los años de experiencia es invalida`,'error');
      return false;
    }

    return true;
  }
  guardarMedico(){

  if(this.medicoSeleccionado){
    const nombre = this.medicoSeleccionado.nombre
    console.log(this.medicoSeleccionado)
    //actualizar

    if(this.archivo != null){    
      this.medicoService.actualizarImagen(this.archivo,'medicos',this.medicoSeleccionado._id).subscribe((data:any)=>{
        this.medicoForm.value.img = data.nombreArchivo;
      });
    }
    console.log(this.medicoForm.value.img);
  
    setTimeout(()=>{
    const data ={
      ...this.medicoForm.value,
      _id: this.medicoSeleccionado._id
    }
      this.medicoService.actualizarMedico(data)
      .subscribe(resp =>{
        Swal.fire('Actualizado', `Actualizado correctamente`,'success');
        this.router.navigateByUrl(`/dashboard/medicos`);
      })
    },2000)
    
    
  }else{
    //crear
    let { nombre, especialidad,numeroTelefono,area,aniosExperiencia,hospital} = this.medicoForm.value;

  
    if(!this.validaciones()){
      return;
    };

    if(this.archivo != null){
      this.medicoService.guardarImagen(this.archivo,'medicos').subscribe((data:any)=>{  
      
        console.log(data);
        this.nombreArchivo = data.nombreArchivo;
      })
    }
    
    console.log("nombreArchivo"+this.nombreArchivo)

    setTimeout(()=>{
      this.medicoForm.value.img = this.nombreArchivo;
      this.medicoService.crearMedicos(this.medicoForm.value)
      .subscribe ((resp: any) => {
  
        Swal.fire('Creado', `${ nombre } creado correctamente`,'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
  
      })
    },2000)
    
  }
  }

    

}

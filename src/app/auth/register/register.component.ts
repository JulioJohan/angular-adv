import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public static VALIDACION_PASSWORD = "La Contraseña debe contener por lo menos un caracter especial, una mayuscula y un numero";

  public formularioPosteado = false;

  public formularioRegistro = this.formBuilder.group({
    nombre: ['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required],
    password2:['',Validators.required],
    terminos:[true,Validators.required]
  },{
    validators: this.passwordsIguales('password','password2'),
    // Validators: this.validacionPasswordNumeros('password','password2')
  } );

  constructor(private formBuilder:FormBuilder,
              private usuarioService:UsuarioService,
              private router:Router){

  }

  crearUsuario(){
    const password1 = this.formularioRegistro.value.password;
    const password2 = this.formularioRegistro.value.password2;
    this.formularioPosteado = true;
    console.log(this.formularioRegistro.value);
    if(this.formularioRegistro.invalid){
      return;
    }
    if(!this.validacionPasswordNumeros(password1)){
      Swal.fire('Contraseña ',RegisterComponent.VALIDACION_PASSWORD,'error');
      return;
    } 
    this.usuarioService.crearUsuario(this.formularioRegistro.value).subscribe(resp => {
      this.router.navigateByUrl('/')
    },err=>{
      //Si sucede un error
      Swal.fire('Error',err.error.msg,'error');
    })
  }

  campoNoValido(campo:string):boolean{

    if(!this.formularioRegistro.get(campo)?.valid && this.formularioPosteado){
      return true;
    }else{
      return false;
    }
  }

  aceptaTerminos(){
    return !this.formularioRegistro.get('terminos')?.value && this.formularioPosteado
  }

  passwordsNoValidas(){
    const pass1 = this.formularioRegistro.get('password')?.value;
    const pass2 = this.formularioRegistro.get('password2')?.value;

    if(pass1 !== pass2 && this.formularioPosteado ){
      return true;
    }else{
      return false;
    }
  }

  //validacion personalizada
  passwordsIguales(password:string,password2:string){
    return (formGroup:FormGroup) => {
      const pass1Control =formGroup.get(password);
      const pass2Control =formGroup.get(password2);

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsIgual:true})
      }
    }
  }
  validacionPasswordNumeros(password:string){    
      const expresionPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[<>])[A-Za-z\d<>]+$/;
      const verificar = expresionPassword.test(password)
      return verificar;
             
  }
}

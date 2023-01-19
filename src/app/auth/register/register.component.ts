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

  public formularioPosteado = false;

  public formularioRegistro = this.formBuilder.group({
    nombre: ['JulioJohan',[Validators.required,Validators.minLength(3)]],
    email:['juliojohan100@gmail.com',[Validators.required,Validators.email]],
    password:['123456',Validators.required],
    password2:['123456',Validators.required],
    terminos:[true,Validators.required]
  },{
    validators: this.passwordsIguales('password','password2')
  } );

  constructor(private formBuilder:FormBuilder,
              private usuarioService:UsuarioService,
              private router:Router){

  }

  crearUsuario(){
    this.formularioPosteado = true;
    console.log(this.formularioRegistro.value);
    if(this.formularioRegistro.invalid){
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
}

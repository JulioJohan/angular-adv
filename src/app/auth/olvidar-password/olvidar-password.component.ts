import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-olvidar-password',
  templateUrl: './olvidar-password.component.html',
  styleUrls: ['./olvidar-password.component.css']
})
export class OlvidarPasswordComponent {

  constructor(private FormBuilder:FormBuilder, private usuarioService:UsuarioService){}

  public formularioRecuperar = this.FormBuilder.group({
    email:['',Validators.required] 
  })

  validacionCorreoElectronico(email:string){
    const  validacionCorro = /\S+@\S+\.\S+/;
    return validacionCorro.test(email);
  }

  validaciones():boolean{
    if(this.formularioRecuperar.value.email === "" || !this.validacionCorreoElectronico(this.formularioRecuperar.value.email!)){
      Swal.fire('Email','Ingresa un email valido', 'error');
      return false;
    } 

    return true;
  }

  enviarInstrucciones(){
    if(!this.validaciones()){
      return;
    }
    return this.usuarioService.olvideElPassword(this.formularioRecuperar.value!).subscribe(data=>{
      console.log(data)

      if(!data.ok){
        Swal.fire({
          title: data.msg,
          text: 'Verifica el correo electrónico',
          imageUrl: 'https://i.pinimg.com/564x/a1/e2/27/a1e22750dd39a0216a528c7cee960849.jpg',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
      }
      if(data.ok){
        Swal.fire({
          title: data.msg,
          imageUrl: 'https://i.pinimg.com/564x/a1/e2/27/a1e22750dd39a0216a528c7cee960849.jpg',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
      }
     
    })
  }


}

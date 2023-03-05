import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NuevoPassword } from 'src/app/interfaces/nuevo-password';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-nuevo-password',
  templateUrl: './nuevo-password.component.html',
  styleUrls: ['./nuevo-password.component.css']
})
export class NuevoPasswordComponent implements OnInit{
  
  public static VALIDACION_PASSWORD = "La Contraseña debe contener por lo menos un caracter especial, una mayuscula y un numero";
  public tokenDoble:string = '';
  public nuevoPassord: NuevoPassword = new NuevoPassword();

  constructor(private formBuilder:FormBuilder,private router:Router,
     private route: ActivatedRoute, private usuarioService:UsuarioService){}

  public formularioRestaurar = this.formBuilder.group({
    password:['',Validators.required]
  })
  
  ngOnInit(): void {
    this.tokenDoble = this.route.snapshot.paramMap.get('tokenDoble')!;
    // console.log(this.tokenDoble)
    this.validacionTokenPassword(this.tokenDoble)
   
  }

  validacionPasswordNumeros(password:string){    
    const expresionPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+=\-/><])[A-Za-z\d!@#$%^&*()_+=\-/><]{8,}$/;
    console.log(password)
    const verificar = expresionPassword.test(password)
    console.log(verificar)
    return verificar;
           
}

  validacionesPassword():boolean{
    const password = this.formularioRestaurar.value.password;
    if(this.formularioRestaurar.value.password === ""){
      Swal.fire('Error','Ingresa una contraseña mayor a 8 carateres','error')
      return false;
    }
    if(!this.validacionPasswordNumeros(password!)){
      Swal.fire('Error',NuevoPasswordComponent.VALIDACION_PASSWORD,'error')
      return false;
    }
    return true;
  }

  validacionTokenPassword(token:string){
    return this.usuarioService.comprobarTokenPassword(token).subscribe(data=>{
      console.log(data);
      if(!data.ok){
        Swal.fire({
          title: 'Token!',
          text: 'Token No valido',
          imageUrl: 'https://i.pinimg.com/564x/2d/25/99/2d25994fd88a04830fbd9b092eb982a4.jpg',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
        this.router.navigateByUrl('/login')
      }
    })
  }

  enviarNuevaPassword(){
    if(!this.validacionesPassword()){
      return;
    }
    this.nuevoPassord.password = this.formularioRestaurar.value.password!;
    this.nuevoPassord.tokenDoble = this.tokenDoble;

    return this.usuarioService.nuevoPassword(this.tokenDoble,this.formularioRestaurar.value!).subscribe(data=>{
      if(data){
        Swal.fire({
          title: 'Felicidades!',
          text: data.msg,
          imageUrl: 'https://i.pinimg.com/564x/a1/e2/27/a1e22750dd39a0216a528c7cee960849.jpg',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
        this.router.navigateByUrl('/login')
      }
    })
  }
}

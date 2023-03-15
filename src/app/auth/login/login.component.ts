import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginFormulario } from '../../interfaces/login-form';
import Swal from 'sweetalert2';
import { enviroment } from 'src/app/environments/enviroment';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  public keyGoogle: string = enviroment.keyCaptchaGoogle;
  public lenguajeCaptha = 'es';


  //Llamar localmente el html
  @ViewChild('googleBtn') googleBTN!: ElementRef;
  public formularioLogin: FormGroup = this.formBuilder.group({

    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    recordarme: [false],
    recaptcha: ['', Validators.required]
  }, {});

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone) {

  }
  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "122330311092-79l2glcpi7j80lg5ru5g5ekltqfbuhbf.apps.googleusercontent.com",
      //mandar un response ya que en javascrpit this es otra cosa y no es login component
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBTN.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential).subscribe(data => {
      console.log('login', data)
      localStorage.setItem('emailGoogle', data.msg)
      console.log("entre para google")

      console.log("entre para navegar")
      //Navegar al dashboard
      this.router.navigateByUrl('/');



    })
  }
  validacion(error: any) {
    console.log(error)
    if (error.error.msg) {
      Swal.fire('Error', error.error.msg, 'error')
      return;
    } else if (error.error.errores.email) {
      Swal.fire('Error', error.error.errores.email.msg, 'error')
      return;
    } else {
      Swal.fire('Error', error.error.errores.password.msg, 'error')
    }

  }

  validacionCorreoElectronico(email:string){
    const  validacionCorro = /\S+@\S+\.\S+/;
    return validacionCorro.test(email);
  }

  verificarRecaptcha(data: string) {
    this.formularioLogin.value.recaptcha = data;
  }
  validaciones(): boolean {
    if(this.formularioLogin.value.email === ""){
      Swal.fire('Email', 'Ingresa un correo valido', 'error');
      return false;
    }
    if(!this.validacionCorreoElectronico(this.formularioLogin.value.email)){
      Swal.fire('Email', 'Ingresa un correo valido', 'error');
      return false;
    }
    if(this.formularioLogin.value.password === ""){
      Swal.fire('Contraseña', 'Ingresa una contraseña valida', 'error');
      return false;
    }
    // if (this.formularioLogin.value.recaptcha === "") {
    //   Swal.fire('Captha', 'Verifica el captha', 'error');
    //   return false;
    // }
    
    return true;
  }
  login() {

    if(!this.validaciones()){
      return;
    }
    this.usuarioService.login(this.formularioLogin.value).subscribe(data => {
      console.log(data)  
      localStorage.setItem('token',data.msg);
      if (this.formularioLogin.get('recordarme')?.value) {
        localStorage.setItem('email', this.formularioLogin.get('email')?.value)
      } else {
        localStorage.removeItem('email')
      }
      console.log("Entre")
      this.router.navigateByUrl('/');

    }, (error) =>
    // console.log(error)
      this.validacion(error)
      // console.log(error.error.errores.email.msg)
    )
    //Validacion de usuarios

  }
}

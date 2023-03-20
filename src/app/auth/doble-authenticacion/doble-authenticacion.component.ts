import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { LoginComponent } from '../login/login.component';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doble-authenticacion',
  templateUrl: './doble-authenticacion.component.html',
  styleUrls: ['./doble-authenticacion.component.css']
})
export class DobleAuthenticacionComponent implements OnInit {

  // @Input() loginDoble: any;
  loginFormulario!: string;

  constructor(private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LoginComponent>,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    console.log(this.data)

    this.abrirDobleAuthenticacion();
  }



  async abrirDobleAuthenticacion() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Ingresar el codigo de doble authenticacion',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      footer: '<div class="swal-footer"><a href="#" class="btn btn-link">Regresar al login</a><button type="button" class="btn btn-secondary" id="resend">Enviar otro código</button></div>',
      confirmButtonText: 'Iniciar sesion',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      
      didOpen:() => {
        document.querySelector('.swal-footer .btn-link')!.addEventListener('click', () => {
          // Lógica para redirigir a la página de login
          this.router.navigateByUrl('/')
        })
        document.querySelector('.swal-footer .btn-secondary')!.addEventListener('click', () => {
          console.log('Enviar otro código');
          this.usuarioService.login(this.data).subscribe(data=>{
              Swal.fire({
                title: 'El codigo de verificacion se envio a tu correo!',
                text: data.msg,
                imageUrl: 'https://i.pinimg.com/564x/a1/e2/27/a1e22750dd39a0216a528c7cee960849.jpg',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Custom image',
              })
              setTimeout(()=>{
                this.abrirDobleAuthenticacion();
              },1000)
          },error=>{
            this.erroresBackendLogin(error);
          })
        });
      }
    })  



    if (value.trim().length <= 0) {
      Swal.fire('Error', 'Ingresa un codigo valido', 'error');
      setTimeout(() => {
        this.abrirDobleAuthenticacion();
      }, 2000);
      return;
    }
    this.data.authenticacionDoble = value;

    return this.usuarioService.dobleAutheticacion(this.data).subscribe(data => {      
      this.router.navigateByUrl('/dashboard')

    },error=>{
      this.verificacionError(error)
    })

  }

  erroresBackendLogin(error:any){
    if(!error.error.ok){
      Swal.fire('Error', "Vuelve intentar iniciar sesion", 'error');
      setTimeout(() => {
        this.abrirDobleAuthenticacion();
      }, 2000);
    }
  }

  verificacionError(error:any){
    if (!error.error.ok) {
      console.log(error.ok)
      Swal.fire('Error', error.error.msg, 'error');
      setTimeout(() => {
        this.abrirDobleAuthenticacion();
      }, 2000);
    }
  }


}

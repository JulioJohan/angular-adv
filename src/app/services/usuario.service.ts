import { Injectable, NgZone } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../environments/enviroment';
//dispara un efecto secundario
import { tap, map, Observable, catchError, of } from 'rxjs';


import { FormularioRegistro } from '../interfaces/register-form.interface';
import { LoginFormulario } from '../interfaces/login-form';
import { Router } from '@angular/router';

declare const gapi: any;
declare const google:any;

const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public gapi:any;
  public auth2: any;

  constructor(private http:HttpClient,private router:Router, private ngZone:NgZone) {
  // this.googleInit()
  }

//   googleInit(){
//     return new Promise( resolve => {
//      this.gapi.load('auth2', () => {
//         this.auth2 = this.gapi.auth2.init({
//           client_id: '122330311092-79l2glcpi7j80lg5ru5g5ekltqfbuhbf.apps.googleusercontent.com"',
//           cookiepolicy: 'single_host_origin',
//         });

//         resolve(this.auth2);
//       });
//     })
// }
    

  logout(){
    //Remover el correo
    localStorage.removeItem('token');
    const emailGoogle = localStorage.getItem('email')
    google.accounts.id.revoke(emailGoogle, () =>{
      this.router.navigateByUrl('/login');
    })

    // console.log(
    //   this.auth2);
    // this.auth2.signOut().then(() => {

    //   this.ngZone.run(() => {
    //     this.router.navigateByUrl('/login');
    //   })
    // });
    
  }
  //verificar el token
  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    //obteniendo los headers
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token 
      }
    }).pipe(
      //obtenemos la respuesta
      tap((resp:any) =>{
        console.log(resp.token)
        //nueva version del token grabada
        localStorage.setItem('token',resp.token);
      }),
      //transformar a un booleano
      map(resp=> true),
      //si hay un error
      catchError(error => of(false))
    );
  }

  crearUsuario(formularioData:FormularioRegistro){
    // pipe guardando todo el token en el token storage
    return this.http.post(`${base_url}/usuarios/guardarUsuario`,formularioData).pipe(tap((resp:any)=>{
      console.log(resp)
      localStorage.setItem('token',resp.token);
    }))
  }

  login(formularioData:LoginFormulario){
    return this.http.post(`${base_url}/login`,formularioData).pipe(tap((resp:any)=>{
      console.log(resp)
      //guardando token
      localStorage.setItem('token',resp.msg);
    }))
  }

  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token}).pipe(tap((resp:any)=>{
      localStorage.setItem('token',resp.token);
    }))
  }
}

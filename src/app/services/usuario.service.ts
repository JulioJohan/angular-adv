import { Injectable, NgZone } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../environments/enviroment';
//dispara un efecto secundario
import { tap, map, Observable, catchError, of } from 'rxjs';


import { FormularioRegistro } from '../interfaces/register-form.interface';
import { LoginFormulario } from '../interfaces/login-form';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { ActualizarUsuario } from '../interfaces/ActualizarUsuario-form';
import { ObtenerUsuarios } from '../interfaces/ObtenerUsuarios';

declare const gapi: any;
declare const google:any;

const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public gapi:any;
  public auth2: any;

  public usuario!:Usuario;

  constructor(private http:HttpClient,private router:Router, private ngZone:NgZone) {
  // this.googleInit()
  }
  get token():string{
    return localStorage.getItem('token') || '';
  }
  get uid():string{
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  logout(){
    //Remover el correo
    localStorage.removeItem('token');
    const emailGoogle = localStorage.getItem('emailGoogle');
    if(!emailGoogle){
      this.ngZone.run(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.router.navigateByUrl('/login');
        return;
      })
    }
    google.accounts.id.revoke(emailGoogle, () =>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
        localStorage.removeItem('emailGoogle')
      })      
      // this.router.navigateByUrl('/login');
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
        'x-token':this.token 
      }
    }).pipe(
      //obtenemos la respuesta
      map((resp:any) =>{
        console.log(resp);                
        const {email, google,nombre,role,img = '', uid} = resp.usuarioDB;
        //instanciando para guardar y obtener los metodos
        this.usuario = new Usuario(
          nombre,email,'',img,google,role,uid 
        );
        // this.usuario.imprimirUsuario()
        //nueva version del token grabada
        localStorage.setItem('token',resp.token);
        return true
      }),
   
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
  actualizarUsuario(formularioData:ActualizarUsuario):Observable<Usuario>{
    // formularioData ={
    //   ...formularioData,
    //   role:this.usuario.role || ''
    // }
    console.log(formularioData);
    return this.http.put<Usuario>(`${base_url}/usuarios/actualizarUsuario/${this.uid}`,formularioData,{
        headers:{
          'x-token':this.token 
        }
    });
    
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

  obtenerUsuarios(desde:number = 0):Observable<ObtenerUsuarios>{
    const url =`${base_url}/usuarios/?desde=${desde}`
    return this.http.get<ObtenerUsuarios>(url,this.headers);
  }
}
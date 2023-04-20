import { ChangeDetectorRef, Injectable, NgZone } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from '../environments/enviroment';
//dispara un efecto secundario
import { tap, map, Observable, catchError, of, interval,Subscription, switchMap } from 'rxjs';


import { FormularioRegistro } from '../interfaces/register-form.interface';
import { LoginFormulario } from '../interfaces/login-form';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { ActualizarUsuario } from '../interfaces/ActualizarUsuario-form';
import { ObtenerUsuarios } from '../interfaces/ObtenerUsuarios';
import { Respuesta } from '../interfaces/respuesta';
import { NuevoPassword } from '../interfaces/nuevo-password';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';





declare const gapi: any;
declare const google:any;

const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public subscripcion = new Subscription;
 
  public fechaExpiracion:any;
  public static httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
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
  get role():'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.role!;
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  guardarLocalStorage(token:string,menu:any){
    localStorage.setItem('token',token);
    localStorage.setItem('menu',JSON.stringify(menu));
  }

  logout(){
    //Remover el correo
    // localStorage.removeItem('token');
    const emailGoogle = localStorage.getItem('emailGoogle');
    // TODO: Borrar menu
    if(!emailGoogle){
      this.ngZone.run(()=>{
        console.log("Entre")
        this.ngOnDestroy();
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('menu')
        this.router.navigateByUrl('/login');
      })
    }else{
      this.ngZone.run(()=>{
      google.accounts.id.revoke(emailGoogle, () =>{
          location.reload();
          this.ngOnDestroy();
          localStorage.removeItem('emailGoogle')
          localStorage.removeItem('menu');
          localStorage.removeItem('token');
          this.router.navigateByUrl('/login');         
        })      
        // this.router.navigateByUrl('/login');
      })
    }
    

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
    console.log("Validar Token")
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
       
        this.guardarLocalStorage(resp.token,resp.menu);
        console.log("Renew"+resp.token)
        this.fechaExpiracion = jwt_decode(resp.token)
        localStorage.setItem('fechaExpiracion',this.fechaExpiracion.exp);
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
      this.guardarLocalStorage(resp.token,resp.menu)
      // localStorage.setItem('token',resp.token);
      // localStorage.setItem('menu',resp.menu);
      //agregar login 
      // localStorage.setItem('token',resp.token);
    }))
  }
  actualizarPerfil(formularioData:ActualizarUsuario):Observable<Usuario>{
    formularioData ={
      ...formularioData,
      role:this.usuario.getRole!
    }
    console.log(formularioData);
    return this.http.put<Usuario>(`${base_url}/usuarios/actualizarUsuario/${this.uid}`,formularioData,this.headers);
    
  }

  login(formularioData:LoginFormulario){
    return this.http.post(`${base_url}/login`,formularioData).pipe(tap((resp:any)=>{
      console.log(resp)
     
      // localStorage.setItem('token',resp.token);
      // localStorage.setItem('menu',resp.menu);
    }))
  }

  dobleAutheticacion(usuario:any){
    return this.http.post(`${base_url}/login/dobleAuthenticacion`,usuario).pipe(tap((resp:any)=>{
      this.fechaExpiracion = jwt_decode(resp.msg)
      localStorage.setItem('fechaExpiracion',this.fechaExpiracion.exp);
      //guardando token
      this.guardarLocalStorage(resp.msg,resp.menu)
    }))
  }

  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token}).pipe(tap((resp:any)=>{
      this.guardarLocalStorage(resp.token,resp.menu)
      this.fechaExpiracion = jwt_decode(resp.token)
      localStorage.setItem('fechaExpiracion',this.fechaExpiracion.exp);

      // localStorage.setItem('token',resp.token);
      // localStorage.setItem('menu',resp.menu);
    }))
  }

  obtenerUsuarios(desde:number = 0):Observable<ObtenerUsuarios>{
    const url =`${base_url}/usuarios/?desde=${desde}`
    return this.http.get<ObtenerUsuarios>(url,this.headers).pipe(map(resp=>{
      const usuarios = resp.usuarios.map(usuario=>
        new Usuario(usuario.nombre,usuario.email,'',usuario.img,usuario.google,usuario.role,usuario.uid))
      return {
        total:resp.total,
        usuarios
      };
    }))
  }
  eliminarUsuario(usuario:Usuario){
    const url =`${base_url}/usuarios/eliminarUsuario/${usuario.uid}`
    return this.http.delete(url,this.headers )
  }


  //Actualiza el usuario 
  guardarUsuario(formularioData:Usuario):Observable<Usuario>{
    // formularioData ={
    //   ...formularioData,
    //   role:this.usuario.role || ''
    // }
    console.log(formularioData);
    return this.http.put<Usuario>(`${base_url}/usuarios/actualizarUsuario/${formularioData.uid}`,formularioData,this.headers);
    
  }

  confirmarCuentaEmail(tokenDoble:string):Observable<any>{
    return this.http.get<any>(`${base_url}/login/confirmar/${tokenDoble}`);
  }
  olvideElPassword(email:any):Observable<Respuesta>{
    console.log(email)
    return this.http.post<Respuesta>(`${base_url}/login/olvide-password`,email);

  }

  comprobarTokenPassword(token:any):Observable<Respuesta>{
    return this.http.get<Respuesta>(`${base_url}/login/nuevo-password/${token}`);
  }
  nuevoPassword(tokenDoble:any, password:any):Observable<Respuesta>{
    // console.log(nuevoPassword.password);
    return this.http.post<Respuesta>(`${base_url}/login/nuevo-password/${tokenDoble}`,password);
  }


  tokenExpirado(){
    console.log("verificando")
    this.subscripcion = interval(40000).subscribe(data=>{
      const fechaActual = new Date().getTime() / 1000;
      const tiempoRestante = Number(localStorage.getItem('fechaExpiracion')) - fechaActual;
      const tiempoRestanteMinutos = tiempoRestante / 60;
      console.log(tiempoRestanteMinutos); 
      if(Math.round(tiempoRestanteMinutos) === 5){
        Swal.fire({
          title: 'Tu sesion esta por expirar',
          text: "Deseas Renovarlo?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Renovar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.validarToken();
            location.reload();
          }
          if(result.isDismissed){
            this.tokenExpirado();
          }
        })
      }

      if(tiempoRestanteMinutos <= 0){
        Swal.fire('Sesion','Token Expirado','error');
        //saber el id de la alerta
        setTimeout(()=>{
          Swal.close()
        },2000);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('fechaExpiracion');
        this.ngOnDestroy();
        this.router.navigateByUrl('/login');

      }
    })
   
  }

  ngOnDestroy():void{
    this.subscripcion.unsubscribe();  
  }
  


}

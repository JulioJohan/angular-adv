import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../environments/enviroment';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { BusquedaTodos } from '../interfaces/busqueda_todos';
import { Medico } from '../models/medicos.model';

const base_url = enviroment.base_url

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http:HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }
  private transformarUsuarios(resultados:any[]):any[]{
    
    return resultados.map(user=> new Usuario(user.nombre, user.email,'',user.img, user.google,user.role,user.uid))
  }

  
  private transformarHospitales(resultados:any[]):any[]{
    
    return resultados
  }

  private transformarMedicos(resultados:any[]):Medico[]{
    
    return resultados
  }


  busquedaGlobal(termino:string):Observable<BusquedaTodos>{
    const url =`${base_url}/todo/${termino}`;
    return this.http.get<BusquedaTodos>(url,this.headers);
  }
  buscar(tipo:'usuarios'|'medicos'|'hospitales',
        termino:string){
    const url =`${base_url}/todo/collecion/${tipo}/${termino}`;
    return this.http.get(url,this.headers)
    .pipe(map((resp:any)=> resp.data)).pipe(map((resp:any)=>{
      switch(tipo){
        case 'usuarios':
          return this.transformarUsuarios(resp);
          
        case 'hospitales':
          return this.transformarHospitales(resp);

        case 'medicos':
          return this.transformarMedicos(resp);
        default:
          return [];
      }
    }))
  }
}

import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { enviroment } from '../environments/enviroment';
import { Medico } from '../models/medicos.model';
import { HttpClient } from '@angular/common/http';

const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }
  
  get headers (){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarMedicos() {

    const url = `${ base_url }/medicos`;
    return this.http.get( url, this.headers )
              .pipe(
                map((resp:any) => resp.medicos )
             );
  }

  crearMedicos(medico: Medico) {

    const url = `${ base_url }/medicos`;
    return this.http.post( url, medico , this.headers );
  }

  actualizarMedico( medico: Medico ) {

    const url = `${ base_url }/medicos/${ medico._id }`;
    return this.http.put( url,  medico , this.headers );
  }

  eliminarMedico( _id: string ) {

    const url = `${ base_url }/medicos/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
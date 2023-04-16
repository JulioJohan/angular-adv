import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Hospital } from '../models/hospital.model';
import { enviroment } from '../environments/enviroment';

const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarHospital() {

    const url = `${ base_url }/hospitales`;
    return this.http.get( url, this.headers )
              .pipe(
                map((resp:any) => resp.hospitales )
             );
  }

  obtenerPorId(id:string){
    const url = `${ base_url }/hospitales/obtenerHospitalById/${ id }`;
    return this.http.get( url, this.headers )
    .pipe(
      map((resp:any) => resp.hospital)
   );
  }

  crearHospital(hospital: Hospital) {

    const url = `${ base_url }/hospitales/guardarHospital`;
    return this.http.post( url,hospital , this.headers );
  }

  actualizarHospital( hospital:Hospital) {

    const url = `${ base_url }/hospitales/actualizarHospital/${ hospital._id }`;
    return this.http.put( url,hospital, this.headers );
  }

  eliminarHospital( _id: string ) {

    const url = `${ base_url }/hospitales/eliminarHospital/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}

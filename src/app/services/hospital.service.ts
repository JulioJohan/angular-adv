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

  cargarHospitales() {

    const url = `${ base_url }/hospitales`;
    return this.http.get( url, this.headers )
              .pipe(
                map((resp:any) => resp.hospitales )
             );
  }

}

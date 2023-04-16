import { Injectable } from '@angular/core';
import { enviroment } from '../environments/enviroment';

const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo:File,
    tipo:'usuarios' | 'medicos' | 'hospitales',
    id:string
  ){
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen',archivo);
      //feth puedes hacer metodos http
      const respuesta = await fetch(url,{
        method:'PUT',
        headers:{
          'x-token':localStorage.getItem('token') || ''
        },
        body:formData
      });
      const data = await respuesta.json();
      if(data){
        console.log(data)
        return data.nombreArchivo;
      }else{
        console.log(data)
        return false
      }
    } catch (error) {
      console.log(error)
      return false;
    }
  }

  async guardarFoto(
    archivo:File,
    tipo:'usuarios' | 'medicos' | 'hospitales',
  ){
    try {
      console.log(tipo)
      const url = `${base_url}/upload/${tipo}`;
      const formData = new FormData();
      formData.append('imagen',archivo);
      //feth puedes hacer metodos http
      const respuesta = await fetch(url,{
        method:'POST',
        headers:{
          'x-token':localStorage.getItem('token') || ''
        },
        body:formData
      });
      const data = await respuesta.json();
      if(data){
        return data.nombreArchivo;
      }else{
        console.log(data)
        return false
      }
    } catch (error) {
      console.log(error)
      return false;
    }
  }
}

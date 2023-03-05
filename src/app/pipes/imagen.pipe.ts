import { Pipe, PipeTransform } from '@angular/core';
import { enviroment } from '../environments/enviroment';

const base_url = enviroment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenesPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios'|'hospitales'|'medicos'): string {
    
    if (img !== ""){
      return `${ base_url}/upload/usuarios/no-img`;
    }else if  (img.includes('https')) {
      return img;
    }else if  (img){
      return `${ base_url }/upload/${tipo}/${img}`;
    }else if(img === ""){
      return `${ base_url}/uploads/no-img`;
    }else {
      return `${ base_url }/upload/usuarios/no-img`;
    }

  }

}

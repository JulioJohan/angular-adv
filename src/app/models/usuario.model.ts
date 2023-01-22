import { enviroment } from '../environments/enviroment';

const base_url = enviroment.base_url;

export class Usuario {
    constructor(
        public nombre:string,
        public email:string,
        public password?:string,
        public img?:string,
        public google?:boolean,
        public role?:string,
        public uid?: string,
    ) { }

    get imagenURL(){
        // http://localhost:3000/api/upload/usuarios/d2e845da-da81-46f4-bcd9-d861da7260sss30.gif
        if(this.img?.includes('https')){
            return this.img;
        }
        if(this.img == '') {
            return 'http://localhost:3000/api/upload/usuarios/no-image'
        }else{
            return `${base_url}/upload/usuarios/${this.img}`
        }

        
    }

    get getRole():string{
        return this.role!;
    }
    
}
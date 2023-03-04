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
        public confirmado?:boolean,
    ) { }

    get imagenURL(){
        if(!this.img){
            return `${base_url}/upload/usuarios/${this.img}`
        }else if(this.img?.includes('https')){
            return this.img;
        }else if(this.img == '') {
            return 'http://localhost:3000/api/upload/usuarios/no-image'
        // http://localhost:3000/api/upload/usuarios/d2e845da-da81-46f4-bcd9-d861da7260sss30.gif
        }else{
            return `${base_url}/upload/usuarios/${this.img}`
        }

        
    }

    get getRole():string{
        return this.role!;
    }
    
}
import { Hospital } from "./hospital.model";

export interface _MedicoUser{
    _id: string;
    nombre: string;
    img: string;
}

export class Medico {

    constructor(
        public nombre:string,
        public especialidad:string,
        public numeroTelefono: number,
        public area: string,
        public aniosExperiencia: number,
        public _id:string,
        public usuario:_MedicoUser,
        public hospital?: Hospital,        
        public img?:string,

    ){}

}
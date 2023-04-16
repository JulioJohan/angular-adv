interface _HospitalUser{
    _id: string;
    nombre: string;
    img: string;
}

export class Hospital {

    constructor(
        public nombre:string,
        public ciudad:string,
        public domicilio:string,
        public numeroTelefono:number,
        public fechaInaguracion:Date,
        public _id:string,
        public usuario:_HospitalUser,
        public img?:string,
    ){}

}
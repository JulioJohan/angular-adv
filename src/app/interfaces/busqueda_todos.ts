import { Medico } from '../models/medicos.model';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
export interface BusquedaTodos{
    usuarios:Usuario[];
    medicos:Medico[];
    hospitales:Hospital[]
}
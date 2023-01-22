import { Usuario } from '../models/usuario.model';
export interface ObtenerUsuarios{
    total:number;
    usuarios:Usuario[];
}
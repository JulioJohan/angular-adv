import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService:UsuarioService,
               private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    //validar el token  
    return this.usuarioService.validarToken().pipe(tap( estaAutenticado =>{
      //efecto secundario  
      if(!estaAutenticado){
          this.router.navigateByUrl('/login')
        }
    } ))
  }
  
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private usuarioService:UsuarioService,
              private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if(this.usuarioService.role === "ADMIN_ROLE"){
        return true;
      }else{
        this.router.navigateByUrl('/inicio')
        return false;
      }
    
      // return (this.usuarioService.role === "ADMIN_ROLE") ? true : false;

  }
  
}

import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Submenu } from '../../interfaces/submenu';
import { of, filter } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-busqueda-paginas',
  templateUrl: './busqueda-paginas.component.html',
  styleUrls: ['./busqueda-paginas.component.css']
})
export class BusquedaPaginasComponent implements OnInit{

  public submenuPrincipal:Submenu[] = []; 
  public submenuDashboard:Submenu[] = []

  constructor(private sidebarService:SidebarService,
              private activatedRoute:ActivatedRoute,
              private usuarioService:UsuarioService,
              private router:Router){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({termino})=>{
      this.busquedaGlobalApp(termino)
    })
  }

  busquedaGlobalApp(termino:string){
    const principal = this.sidebarService.menu[0].submenu;
    const dashboard = this.sidebarService.menu[1].submenu;  
    console.log(principal)

    
    this.submenuPrincipal = principal.filter((data:Submenu) => data.titulo.toLowerCase().includes(termino.toLowerCase()));
    this.submenuDashboard = dashboard.filter((data:Submenu) => data.titulo.toLowerCase().includes(termino.toLowerCase()));

    const filtro = this.submenuPrincipal.concat(this.submenuDashboard);
    console.log(this.submenuPrincipal);
    console.log(this.submenuDashboard)
    // console.log(filtro)
  }
  enviarPagina(url:string){
    this.router.navigateByUrl(`dashboard/${url}`);
  }
  
  
}

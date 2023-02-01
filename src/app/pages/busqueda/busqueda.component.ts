import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit{
  constructor(private activatedRoute:ActivatedRoute,
              private busquedasService:BusquedasService){
  }

  public usuarios:Usuario[] = [];
  public medicos:Usuario[] = [];
  public hospitales:Usuario[] = [];


  ngOnInit(): void {
    //obteniendo los parametros
    this.activatedRoute.params.subscribe(({termino})=>{
      this.busquedaGlobal(termino);
    })
  }

  busquedaGlobal(termino:string){
    this.busquedasService.busquedaGlobal(termino).subscribe(resp=>{
      console.log(resp);
      this.usuarios = resp.usuarios;
      this.medicos = resp.usuarios;
      this.hospitales = resp.usuarios;
    });
  }

  // TODO: poner el tipado de medico
  abrirMedico(medico:any){

  }
}

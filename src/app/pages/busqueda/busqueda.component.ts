import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuario.model';
import { Medico } from 'src/app/models/medicos.model';
import { Hospital } from '../../models/hospital.model';
import { BusquedaTodos } from 'src/app/interfaces/busqueda_todos';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit{
  
  // activatedRoute:ActivatedRoute,
  // obtiene los paramas
  constructor(private activatedRoute:ActivatedRoute,
              private busquedasService:BusquedasService){
  }

  public usuarios:Usuario[] = [];
  public medicos:Medico[] = [];
  public hospitales:Hospital[] = [];


  ngOnInit(): void {
    //obteniendo los parametros
    this.activatedRoute.params.subscribe(({termino})=>{
      this.busquedaGlobal(termino);
    })
  }

  busquedaGlobal(termino:string){
    this.busquedasService.busquedaGlobal(termino).subscribe((resp:BusquedaTodos)=>{
      console.log(resp);
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    });
  }

  abrirMedico(medico:Medico){
    // this.
  }
}

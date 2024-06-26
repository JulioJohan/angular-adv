import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo!:string;
  public seccion!:string;
  public subseccion!:string;
  public inicio!:boolean;
  

  public tituloSubs$!:Subscription;

  constructor(private router:Router,private activatedRoute:ActivatedRoute){
    
    this.tituloSubs$ =  this.getArgumentosRuta().
    subscribe(({titulo,seccion,subseccion})=>{
      this.titulo = titulo;
      titulo == "inicio" ? this.inicio = true : this.inicio = false;
      this.seccion =seccion;
      this.subseccion = subseccion;
      document.title = `AdminPro - ${this.titulo}`; 
     
    })
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }
  getArgumentosRuta(){
    return this.router.events
    .pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild ===null),
      map((event :ActivationEnd)=> event.snapshot.data)
    )

  }
}

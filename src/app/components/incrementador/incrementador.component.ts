import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }
  //renombrar el input
  // @Input('valor') progreso:number = 50;
  @Input() progreso:number = 50;

  @Input() btnClass:string = 'btn-primary';


  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();
  
  // get getPorcentage():string{
  //   return `${this.progreso}% `
  // }
  
  cambiarValor(valor:number){
    if(this.progreso >= 100){
      this.valorSalida.emit(100);
      this.progreso = 100;
    }
 
    if(this.progreso < 0){
      this.valorSalida.emit(0);
      this.progreso = 0;
    }
 
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);

  }

  onChange(nuevoValor:number){
    if(nuevoValor >=100){
      this.progreso = 100;
    }else if(nuevoValor <= 0){
      this.progreso = 0;
    }else{
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit(this.progreso);
  }
}

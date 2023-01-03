import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls:[ './progress.component.css']
})
export class ProgressComponent {

  progreso1:number = 0;
  progreso2:number = 0;

  get getPorcentage1():string{
    return `${this.progreso1}% `
  }

  get getPorcentage2():string{
    return `${this.progreso2}% `
  }

  // cambioValorHijo(valor:number){
  //   this.progreso1 = valor;
  //   console.log(valor + 'valor')
  // }

}

import { Component, Input, Output } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';



@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  data: any

  @Input() titulo:string = 'Sin titulo';

  @Input('labels') doughnutChartLabels: string[] = [ 'Label1 ', 'Label2', 'Label3' ];
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ], 
        backgroundColor: ['#6857E6','#009FEE','#F02059'],
        // hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
        // hoverBorderColor:['#000000','#000000','#00000003']
      },
      
    ]
  };

 
  @Output()


  

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}

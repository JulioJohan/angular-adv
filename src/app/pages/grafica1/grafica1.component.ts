import { Component, OnInit } from '@angular/core';
import { ChartData, ChartDataset } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls:['./grafica1.component.css']
})
export class Grafica1Component implements OnInit{

  ngOnInit(): void {
    this.obtenerDataGrafica();
  }

  public dataN:number[] =[ 1, 1, 1 ]; 
  
  labels1:string[] = ['Pan', 'Refresco', 'Tacos' ];
  public doughnutChartData1: ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [
      { data: this.dataN, 
        backgroundColor: ['#6857E6','#009FEE','#F02059'],
        // hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
        // hoverBorderColor:['#000000','#000000','#00000003']
      },
      
    ]
  };

 


  ngOnChanges(){
    this.doughnutChartData1 = {
      labels: this.labels1,
      datasets: [{ data: this.dataN }],
    };
  
  }


  obtenerDataGrafica(){
    this.doughnutChartData1.datasets.forEach(dataa=>{
      this.dataN = dataa.data;
    })
  }
}

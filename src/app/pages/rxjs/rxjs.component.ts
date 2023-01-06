import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy{

  //propiead para cancelar un observable
  public intervalSubs!:Subscription;

  //map tranformar la salida de un observable

  constructor(){
  


    //pipe transformar la informacion de un observable 
    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('subs',valor),
    //   //error
    //   (error) => console.warn('Error',error),
    //   () => console.info('Obs terminado')
    // );

    this.intervalSubs = this.retornaIntevaloFilter().subscribe(console.log)
  
  }
  ngOnDestroy(): void {
    //cancelando el suscribe
    this.intervalSubs.unsubscribe();
  }


  retornaIntevaloMap(): Observable<number>{

    //take cuatas emisiones del observable necesitan 
    //map sirve para transformar la informacion que sirve el observable y mutarlo como uno la necesite
    const intervalo$ = interval(1000)
                        .pipe(
                          take(4),
                          map(valor =>{
                            return valor +1;
                          })
                        )
    return intervalo$;
  }

  retornaIntevaloFilter(): Observable<number>{

    //take cuatas emisiones del observable necesitan 
    //map sirve para transformar la informacion que sirve el observable y mutarlo como uno la necesite
    const intervalo$ = interval(1000)
                        .pipe(
                          // take(10),
                          map(valor =>{
                            return valor +1;
                          }),
                          filter(valor => (valor % 2  == 0) ? true : false)

                        )
    return intervalo$;
  }

  retornaObservable():Observable<number>{
    let i = -1;

    const obs$ = new Observable<number>((observer )=>{

      //Cada segundo se lanzara el console log hasta que se suscriba
     const intervalo =  setInterval(()=>{
        // console.log('tick');
        i++;
        //valor a emitir
        observer.next(i);
        if( i === 4 ){
          //cancelar intervalos
          clearInterval(intervalo);
          //se termino
          observer.complete();
        }
        if(i === 2){
          // i = 0;
          observer.error('I llego al valor del 2');
        }
      },1000)
    });
    return obs$;

  }


}

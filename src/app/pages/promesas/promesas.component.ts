import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {
  constructor(){}

  ngOnInit(): void {

    this.getUsuarios().then(usuario=>{
      console.log(usuario)
    })
    // this.getUsuarios();
    // const promesa = new Promise((resolve,reject)=>{
    //   //verificar si salio bien o mal
    //   if(false){
    //     resolve('Hola Mundo')
    //   }else{
    //     reject('Algo salio mal');
    //   }

    // });

    // //cuando se haga correctamente
    // //mensaje = 'Hola mundo'
    // promesa.then( (mensaje)=>{
    //   //cuando la promesa se resuelve
    //   console.log(mensaje);
    //   console.log('Termine');
    // })
    // //Manejar el error
    // .catch((error)=>{
    //   console.log('Error en mi promesa' + error);
    // });  
    // console.log('Fin del init');

  }

  // getUsuarios(){
  //   fetch('https://reqres.in/api/users')
  //     .then(resp=> {
  //       //necesito extraer el body pero en json
  //       resp.json().then(body=>{
  //         console.log(body)
  //       })
  //     })
  // }

  getUsuarios(){
    const promesa = new Promise((resolve,reject)=>{
      fetch('https://reqres.in/api/users')
      .then(resp=> resp.json())
      .then(body => resolve(body.data))
    })
    return promesa;

    
  }

  


}

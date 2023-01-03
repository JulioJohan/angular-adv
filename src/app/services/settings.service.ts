import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkeElementoColor = document.querySelector('#theme');

  constructor(){
    const url = localStorage.getItem('tema') || './assets/css/colors/purple-dark.css'
    //guardando en el local storage
     this.linkeElementoColor?.setAttribute('href',url);
  }

  changeColor(tema:string){
    //id del elemento de html
   const url =  `./assets/css/colors/${tema}.css`;

   //cambiar el href
   //elemento que quiero cambiar
   this.linkeElementoColor?.setAttribute('href',url);
  //guardando en el local storage
   localStorage.setItem('tema',url);

   this.checkCurrentTheme();
 
  }

  checkCurrentTheme(){
    //obtener los que tiene una clase en especifico
    
  const linkeElementoColor = document.querySelector('#theme');
  const links = document.querySelectorAll('.selector');
    
    links.forEach(element=>{
      //eliminar una clase
      element.classList.remove('working');
      //obtentendo el valor de data-theme
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkeElementoColor?.getAttribute('href')
      
      if(btnThemeUrl ===  currentTheme){
        element.classList.add('working');
      }

    });
  }


}

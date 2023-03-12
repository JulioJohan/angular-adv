import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {


  constructor(private settingsService:SettingsService,
              private usuarioService:UsuarioService){

  }

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }




  changeColor(tema:string){
  this.settingsService.changeColor(tema);
 
  }

 
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit{
  
  parametroTokenValidacion:string = "";

  constructor(private route: ActivatedRoute,private usuarioService:UsuarioService,
            private router:Router ) {}

  ngOnInit(): void {
    this.verificarTokenEmail();
  }

  verificarTokenEmail(){
    this.parametroTokenValidacion = this.route.snapshot.paramMap.get('tokenDoble')!;
    console.log("Token"+this.parametroTokenValidacion);
    this.usuarioService.confirmarCuentaEmail(this.parametroTokenValidacion).subscribe(data=>{
      console.log(data)
      if(!data.ok){
        Swal.fire({
          title: 'Token!',
          text: 'Token No valido',
          imageUrl: 'https://i.pinimg.com/564x/2d/25/99/2d25994fd88a04830fbd9b092eb982a4.jpg',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
        this.router.navigateByUrl('/login')
      }
      if(data.ok){
        Swal.fire({
          title: 'Tu cuenta ha sido confirmada!',
          text: 'Ya puedes iniciar sesion',
          imageUrl: 'https://i.pinimg.com/564x/a1/e2/27/a1e22750dd39a0216a528c7cee960849.jpg',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
        this.router.navigateByUrl('/login')
      }
    })
  }


}

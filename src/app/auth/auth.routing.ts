import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ConfirmarComponent } from './confirmar/confirmar.component';
import { DobleAuthenticacionComponent } from './doble-authenticacion/doble-authenticacion.component';
import { NuevoPasswordComponent } from './nuevo-password/nuevo-password.component';
import { OlvidarPasswordComponent } from './olvidar-password/olvidar-password.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [

    // {
    //     path:'',
    //     component:LoginComponent,
    //     loadChildren:() => import('../auth/auth-children-routes.module').then(modulo => modulo.AuthChildrenRoutesModule)  
    // },
    { path: 'registrar', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dobleAuthenticacion', component: DobleAuthenticacionComponent },
    { path: 'confirmar/:tokenDoble', component: ConfirmarComponent },
    { path: 'olvide-password', component: OlvidarPasswordComponent },
    { path: 'nuevo-password/:tokenDoble', component: NuevoPasswordComponent }
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }

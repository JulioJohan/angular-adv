import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';


import { PagesComponent } from './pages.component';
import { LoginComponent } from '../auth/login/login.component';

const routes: Routes = [  
    { 
        path: 'inicio', 
        component: PagesComponent,
        canActivate:[AuthGuard],
        canLoad:[AuthGuard],
        loadChildren:() => import ('./child-routes.module').then(modulo => modulo.ChildRoutesModule)
    },    
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}



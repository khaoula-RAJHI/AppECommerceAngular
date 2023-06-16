import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { NgModule } from '@angular/core';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(AuthLayoutRoutes)],
    exports: [RouterModule]
  })

  export class AuthLayoutRoutingMoule { }

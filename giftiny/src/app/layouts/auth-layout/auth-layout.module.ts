import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes, AuthLayoutRoutingMoule } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { authInterceptorProviders } from 'src/app/_helpers/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app.routing';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    BrowserModule,
    AuthLayoutRoutingMoule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [authInterceptorProviders],
})
export class AuthLayoutModule { }

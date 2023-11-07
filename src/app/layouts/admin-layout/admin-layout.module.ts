import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes, AdminLayoutRoutingMoule } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { ProduitComponent } from 'src/app/pages/produit/produit.component';
import { CategorieProduitComponent } from 'src/app/pages/categorie-produit/categorie-produit.component';
import { authInterceptorProviders } from 'src/app/_helpers/auth.interceptor';
import { AdminLayoutComponent } from './admin-layout.component';
import { ProduitClientComponent } from 'src/app/pages/produitClient/produitClient.component';
import { UserComponent } from 'src/app/pages/User/user.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    BrowserModule,
    AdminLayoutRoutingMoule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    UserComponent,
    ProduitComponent,
    ProduitClientComponent,
    CategorieProduitComponent
  ],
  providers: [authInterceptorProviders]
})

export class AdminLayoutModule {}

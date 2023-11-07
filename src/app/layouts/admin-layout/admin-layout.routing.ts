import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ProduitComponent } from 'src/app/pages/produit/produit.component';
import { CategorieProduitComponent } from 'src/app/pages/categorie-produit/categorie-produit.component';
import { NgModule } from '@angular/core';
import { ProduitClientComponent } from 'src/app/pages/produitClient/produitClient.component';
import { UserComponent } from 'src/app/pages/User/user.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'user',   component: UserComponent },
    { path: 'produit',         component: ProduitComponent },
    { path: 'produitClient',         component: ProduitClientComponent },
    { path: 'categorie',         component: CategorieProduitComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(AdminLayoutRoutes)],
    exports: [RouterModule]
  })
  export class AdminLayoutRoutingMoule { }

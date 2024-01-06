import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/user', title: 'Utilisateurs',  icon:'	fas fa-user-friends text-red', class: '' },
    { path: '/produit', title: 'Produits',  icon:'ni-box-2 text-green', class: ''},
    { path: '/categorie', title: 'Catégories de produits',  icon:'ni-bullet-list-67 text-orange', class: '' },
    { path: '/commande', title: 'Commandes',  icon:'ni-basket text-purple', class: '' },
   /* { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private roles!: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username!: string;

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
   this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ADMIN');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/#/login']);
    //window.location.reload();
  }
}

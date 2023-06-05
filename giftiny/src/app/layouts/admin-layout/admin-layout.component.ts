import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
    private roles!: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    username!: string;
  
    constructor(private router: Router , private tokenStorageService: TokenStorageService) { }
  
    ngOnInit(): void {
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

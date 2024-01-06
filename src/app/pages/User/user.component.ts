// user.component.ts

import { Component, OnInit } from "@angular/core";
import { User } from "./user";
import { UserService } from "./user.service";
//import { Role } from "./role";

export interface Role {
  idRole: number;
  name: string;
}
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    users: any;
    form: boolean = false;
    user!: User;
    userId: number;
    roleId: number;
    selectedUserId: number;
    selectedRoleId: number;
    selectedRole:  Role | null = null;
    public roles: Role[] = [];

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.getAllUsers();
        this.getAllRoles();
        this.loadUsers();
        this.user = {
          idUser: null,
          email: null,
          password: null,
          username: null,
          roles: null,
      
        }
        this.selectedRole = null;
    }

    getAllUsers() {
        this.userService.getUsers().subscribe(res => this.users = res);
    }

    public getAllRoles(): void {
      this.userService.displayRoles().subscribe(
        roles => {
          this.roles = roles;
        },
        error => {
          console.log('Erreur lors de la récupération des rôles', error);
        }
      );
    }
    

    deleteUser(idUser: any) {
        this.userService.deleteUser(idUser).subscribe(() => this.getAllUsers());
    }

    loadUsers() {
        this.userService.getUsers().subscribe((data: User[]) => {
            this.users = data;
        });
    }

    updateUserRole() {
  console.log('Selected RoleId:', this.selectedRoleId);

  if (this.selectedRoleId !== null && this.selectedRoleId !== undefined) {
    this.userService.updateUserRole(this.selectedUserId, this.selectedRoleId)
      .subscribe(
        data => {
          console.log('Mise à jour du rôle de l\'utilisateur réussie.', data);
          this.getAllUsers();
          // Ajoutez ici une logique supplémentaire si nécessaire après la mise à jour du rôle
        },
        error => {
          if (error.status !== 200) {
            console.log('Erreur lors de la mise à jour du rôle de l\'utilisateur', error);
            // Gérez l'erreur ici uniquement si le statut n'est pas 200
          } else {
            console.log('Mise à jour du rôle de l\'utilisateur réussie.', error);
            this.getAllUsers(); 
            // Effectuez des actions réussies si nécessaire
          }
        }
      );
  } else {
    console.log('La sélection du rôle n\'est pas valide.');
    // Gérez le cas où la sélection du rôle n'est pas valide
  }
}

    
    }


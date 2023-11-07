import { Component, OnInit } from "@angular/core";
import { User } from "./user";
import { UserService } from "./user.service";

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
selectedUserId: number; // Initialisez avec l'ID de l'utilisateur sélectionné
selectedRoleId: number; // Initialisez avec l'ID du rôle sélectionné
roles: any; // Initialisez avec les rôles récupérés du backend


constructor(private userService: UserService) {
}

ngOnInit() {

  this.getAllUsers();
  this.user = {
    idUser: null,
    email: null,
    password: null,
    username: null,
    roles: null,

  }
/*
  this.userService.displayRoles()
      .subscribe(
        data => {
          //console.log(data); // Manipulez les données reçues ici
          this.roles = data; // Assigner les données récupérées à la variable des rôles
          console.log(this.roles); 
        },
        error => {
          console.log(error);
        });
    
  this.loadUsersWithRoles();*/

  this.loadUsers();
  this.loadRoles();
}

getAllUsers() {
    this.userService.getUsers().subscribe(res => this.users = res)
  }

deleteUser(idUser: any) {
    this.userService.deleteUser(idUser).subscribe(() => this.getAllUsers())
  }
/*
  updateUserRole(userId: number, roleId: number) {
    this.userService.updateUserRole(userId, roleId)
      .subscribe(
        data => {
          console.log("Rôle de l'utilisateur mis à jour avec succès", data);
          // Ajoutez ici une logique supplémentaire si nécessaire après la mise à jour du rôle
        },
        error => {
          console.log("Erreur lors de la mise à jour du rôle de l'utilisateur", error);
          // Gérez l'erreur ici
        }
      );
  }*/
/*
  updateUserRole() {
    this.userService.updateUserRole(this.userId, this.roleId)
      .subscribe(
        data => {
          console.log("Rôle de l'utilisateur mis à jour avec succès", data);
          // Ajoutez ici une logique supplémentaire si nécessaire après la mise à jour du rôle
        },
        error => {
          console.log("Erreur lors de la mise à jour du rôle de l'utilisateur", error);
          // Gérez l'erreur ici
        }
      );
  }*/
/*
  loadUsersWithRoles() {
    this.userService.displayRoles().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des utilisateurs avec les rôles', error);
      }
    );
  }

  updateUserRole() {
    this.userService.updateUserRole(this.selectedUserId, this.selectedRoleId)
      .subscribe(
        data => {
          console.log("Rôle de l'utilisateur mis à jour avec succès", data);
          // Ajoutez ici une logique supplémentaire si nécessaire après la mise à jour du rôle
        },
        error => {
          console.log("Erreur lors de la mise à jour du rôle de l'utilisateur", error);
          // Gérez l'erreur ici
        }
      );
  }
*/


loadUsers() {
  this.userService.getUsers().subscribe((data: User[]) => {
    this.users = data;
  });
}

loadRoles() {
  this.userService.displayRoles().subscribe((data: User[]) => {
    this.roles = data.map((user) => user.roles); // Assurez-vous que la propriété 'roles' contient les noms des rôles
  });
}

updateUserRole() {
  this.userService
    .updateUserRole(this.selectedUserId, this.selectedRoleId)
    .subscribe(
      (data) => {
        console.log('Rôle de l\'utilisateur mis à jour avec succès', data);
        // Ajoutez ici une logique supplémentaire si nécessaire après la mise à jour du rôle
      },
      (error) => {
        console.log('Erreur lors de la mise à jour du rôle de l\'utilisateur', error);
        // Gérez l'erreur ici
      }
    );
}

}
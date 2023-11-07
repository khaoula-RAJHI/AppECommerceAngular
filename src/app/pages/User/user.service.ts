import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { User } from "./user";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  
    private usertUrl: string;
  
    constructor(private http: HttpClient) { 
      this.usertUrl = 'http://localhost:8081/user';
    }
    
    public getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.usertUrl+"/retrieve-all-users");
    }

    public deleteUser(idUser: number): Observable<void> {
      return this.http.delete<void>(`${this.usertUrl+"/remove-user"}/${idUser}`);
    }

    public displayRoles(): Observable<User[]> {
      return this.http.get<User[]>(this.usertUrl+"/displayRoles");
    }

    /*updateUserRole(userId: number, roleId: number): Observable<any> {
      return this.http.put(`${this.usertUrl}/updateUserRole/${userId}`, roleId);
    }*/

    updateUserRole(userId: number, roleId: number): Observable<any> {
      return this.http.put(`${this.usertUrl}/${userId}/roles/${roleId}`, null);
    }
}
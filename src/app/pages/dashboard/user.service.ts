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
}
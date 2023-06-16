import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/authentification/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(AUTH_API + 'signin', credentials, this.httpOptions);
  }

  register(user: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(AUTH_API + 'signup', user, this.httpOptions);
  }
}

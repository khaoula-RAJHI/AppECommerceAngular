import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from './commande';
import { User } from '../User/user';
import { Produit } from './commande.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  //private cmdUrl = 'http://localhost:8081/commande'; 
  private cmdUrl = environment.apiUrl + '/commande';

  constructor(private http: HttpClient) { }

  getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.cmdUrl}/retrieve-all-commandes`);
  }

  saveCommande(commande: Commande): Observable<void> {
    return this.http.post<void>(`${this.cmdUrl}/commandes`, commande);
  }

  calculerMontantCommande(commandeId: number): Observable<number> {
    return this.http.get<number>(`${this.cmdUrl}/commandes/${commandeId}/montant`);
  }

  removeCommande(commandeId: number): Observable<void> {
    return this.http.delete<void>(`${this.cmdUrl}/remove-commande/${commandeId}`);
  }

  public displayProducts(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.cmdUrl + "/displayProducts");
  }

  public displayUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.cmdUrl + "/displayUsers");
  }

  addcmd(cmdId: number, productId: number): Observable<any> {
    return this.http.post(`${this.cmdUrl}/${cmdId}/products/${productId}`, {});
  }
  
}

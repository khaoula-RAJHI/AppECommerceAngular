import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from './commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:8080/commande'; // Update with your API endpoint

  constructor(private http: HttpClient) { }

  getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/retrieve-all-commandes`);
  }

  saveCommande(commande: Commande): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/commandes`, commande);
  }

  calculerMontantCommande(commandeId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/commandes/${commandeId}/montant`);
  }

  removeCommande(commandeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-commande/${commandeId}`);
  }
}

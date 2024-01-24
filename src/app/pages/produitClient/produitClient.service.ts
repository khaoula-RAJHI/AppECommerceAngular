import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from './produitClient';
import { Observable } from 'rxjs';
import { CategorieProduit } from '../categorie-produit/categorie-produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private produitUrl: string;
  private categorieProduitUrl: string;

  constructor(private http: HttpClient) { 
    this.produitUrl = 'http://localhost:8081/produit';
    this.categorieProduitUrl = 'http://localhost:8081/categorieProduit';
  }
  
  public getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.produitUrl+"/retrieve-all-produits");
  }
  

}

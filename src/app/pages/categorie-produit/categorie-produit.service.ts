import { Injectable } from '@angular/core';
import { CategorieProduit } from './categorie-produit';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorieProduitService { 
  //private categorieProduitUrl: string;
  private categorieProduitUrl= environment.apiServerUrl + '/categorieProduit';

  constructor(private http: HttpClient) { 
    //this.categorieProduitUrl = 'http://localhost:8081/categorieProduit';
  }
  
  public getCategorieProduits(): Observable<CategorieProduit[]> {
    return this.http.get<CategorieProduit[]>(this.categorieProduitUrl+"/retrieve-all-categorieProduit");
  }
  

    public save(categorieProduit: CategorieProduit) {
    return this.http.post<CategorieProduit>(this.categorieProduitUrl+"/add-categorieProduit", categorieProduit);
  }
 

  public modifyCategorieProduit(categorieProduit:CategorieProduit):Observable<CategorieProduit> {
    return this.http.put<CategorieProduit>(this.categorieProduitUrl+"/modify-categorieProduit", categorieProduit);
  } 

  public deleteCategorieProduit(idCategorieProduit: number): Observable<void> {
    return this.http.delete<void>(`${this.categorieProduitUrl+"/remove-categorieProduit"}/${idCategorieProduit}`);
  }
}

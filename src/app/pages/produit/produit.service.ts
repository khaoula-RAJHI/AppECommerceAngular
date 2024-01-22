import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from './produit';
import { Observable } from 'rxjs';
import { CategorieProduit } from '../categorie-produit/categorie-produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  /private produitUrl: string;
  //private categorieProduitUrl: string;
  private produitUrl= environment.apiServerUrl + '/produit';
  private categorieProduitUrl= environment.apiServerUrl + '/categorieProduit';

  constructor(private http: HttpClient) { 
    //this.produitUrl = 'http://localhost:8081/produit';
    //this.categorieProduitUrl = 'http://localhost:8081/categorieProduit';
  }
  
  public getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.produitUrl+"/retrieve-all-produits");
  }
  

    public save(produit: Produit) {
    return this.http.post<Produit>(this.produitUrl+"/add-produit", produit);
  }
 

  public modifyProduit(produit:Produit):Observable<Produit> {
    return this.http.put<Produit>(this.produitUrl+"/modify-produit", produit);
  } 

  public deleteProduit(idProduit: number): Observable<void> {
    return this.http.delete<void>(`${this.produitUrl+"/remove-produit"}/${idProduit}`);
  }


  public addprcat(produit: Produit, idCategorieProduit: number) {
    return this.http.post<Produit>(`${this.produitUrl+"/addAndAssignProduitToCategorie"}/${idCategorieProduit}`,produit);
  }
  


public getCategorieProduits(): Observable<CategorieProduit[]> {
  return this.http.get<CategorieProduit[]>(this.categorieProduitUrl+"/retrieve-all-categorieProduit");
}

public displayCategories(): Observable<CategorieProduit[]> {
  return this.http.get<CategorieProduit[]>(this.produitUrl + "/displayCategories");
}

uploadFile(file: File): Observable<HttpEvent<{}>> {
  const formdata: FormData = new FormData();
  formdata.append('file', file);
  const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
      reportProgress: true,
      responseType: 'text'
  });

  return this.http.request(req);
 }
}

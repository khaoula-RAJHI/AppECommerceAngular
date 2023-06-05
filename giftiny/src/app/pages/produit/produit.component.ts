import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from './produit';
import { ProduitService } from './produit.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CategorieProduit } from '../categorie-produit/categorie-produit';
import { CategorieProduitService } from '../categorie-produit/categorie-produit.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  public produits: Produit[] = [];
  public categories: CategorieProduit[] = [];
  public editProduit?: Produit;
  public deleteProduit?: Produit;

  constructor(private produitService: ProduitService, private categorieProduitService: CategorieProduitService, private route: Router) {
  }

  ngOnInit(): void {
    this.getProduits();
    this.getCategorieProduits();
  }

  public getProduits(): void {
    this.produitService.getProduits().subscribe(
      (response: Produit[]) => {
        this.produits = response;
        console.log(this.produits);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
        alert("you are not allowed");
        this.route.navigateByUrl('/dashboard');
      }
    );
  }

  public getCategorieProduits(): void {
    this.categorieProduitService.getCategorieProduits().subscribe(
      (response: CategorieProduit[]) => {
        this.categories = response;
        console.log(this.categories);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
        alert("you are not allowed");
        this.route.navigateByUrl('/dashboard');
      }
    );
  }

  public onAddProduit(addForm: NgForm): void {
    document.getElementById('add-Produit-form')!.click();
    this.produitService.save(addForm.value).subscribe(
      (response: Produit) => {
        console.error
        console.log(response);
        this.getProduits();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProduit(produit: Produit) {
    this.produitService.modifyProduit(produit).subscribe(
      (response: Produit) => {
        console.log(response);
        this.getProduits();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteProduit(idProduit: number): void {
    this.produitService.deleteProduit(idProduit).subscribe(() => { this.getProduits() });
  }


  public onOpenModal(produit: Produit, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editProduit = produit;
      button.setAttribute('data-target', '#updateProduitModal');
    }
    if (mode === 'delete') {
      this.deleteProduit = produit;
      button.setAttribute('data-target', '#deleteProduitModal');
    }
    if (mode === 'add') {

      button.setAttribute('data-target', '#addProduitModal');
    }
    container?.appendChild(button);
    button.click();
  }


}

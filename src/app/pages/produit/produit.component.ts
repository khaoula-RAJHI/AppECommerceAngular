import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from './produit';
import { ProduitService } from './produit.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CategorieProduitService } from '../categorie-produit/categorie-produit.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface CategorieProduit {
  idCategorieProduit : number;
  codeCategorie : string;
  libelleCategorie : string;
}

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produits: any;
  public categories: CategorieProduit[] = [];
  form: boolean = false;
  produit!: Produit;
  closeResult!: string;
  idCategorieProduit: number;

  constructor(private produitService: ProduitService,private categorieProduitService: CategorieProduitService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getCategorieProduits();
    this.loadProducts();

    this.produit = {
      idProduit: null,
      codeProduit: null,
      libelleProduit: null,
      prix: null,
      dateCreation: null,
      categorieProduit: null

    }
    
  }

  getAllProducts() {
    this.produitService.getProduits().subscribe(res => this.produits = res)
  }

  public getCategorieProduits(): void {
    this.categorieProduitService.getCategorieProduits().subscribe(res => this.categories = res);
  }

  loadProducts() {
    this.produitService.getProduits().subscribe(//(data: Produit[]) => {this.produits = data;
    res => { this.produits = res;
        console.log('Produits:', this.produits);
    });
}

  addProduct(produit: Produit) {
    this.produitService.save(produit).subscribe(() => {
      this.getAllProducts();
      this.form = false;
    });
  }

  editProduct(produit: Produit) {
    this.produitService.modifyProduit(produit).subscribe();
  }

  deleteProduct(idProduit: any) {
    this.produitService.deleteProduit(idProduit).subscribe(() => this.getAllProducts())
  }

  open(content: any, action: any) {
    if (action != null)
      this.produit = action
    else
      this.produit = new Produit();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  cancel() {
    this.form = false;
  }

  
  addAndAssignProduitToCategorie(produit: Produit, idCategorieProduit: number) {
    return this.produitService.addprcat(produit, idCategorieProduit).subscribe(() => this.getAllProducts());
  }
  


  
  
  
  
  
  
  
  










  /*
 
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
*/
}

import { Component, OnInit } from '@angular/core';
import { CategorieProduit } from './categorie-produit';
import { CategorieProduitService } from './categorie-produit.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categorie-produit',
  templateUrl: './categorie-produit.component.html',
  styleUrls: ['./categorie-produit.component.css']
})
export class CategorieProduitComponent implements OnInit {

  categories: any;
  form: boolean = false;
  categorie!: CategorieProduit;
  closeResult!: string;

  constructor(private categorieProduitService: CategorieProduitService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllCategorieProduits();
  }

  public getAllCategorieProduits(): void {
    this.categorieProduitService.getCategorieProduits().subscribe(res => this.categories = res);
  }
  addCategorie(categorie: CategorieProduit) {
    this.categorieProduitService.save(categorie).subscribe(() => {
      this.getAllCategorieProduits();
      this.form = false;
    });
  }

  editCategorie(categorie: CategorieProduit) {
    this.categorieProduitService.modifyCategorieProduit(categorie).subscribe();
  }

  deleteCategorie(idCategorieProduit: any) {
    this.categorieProduitService.deleteCategorieProduit(idCategorieProduit).subscribe(() => this.getAllCategorieProduits())
  }

  open(content: any, action: any) {
    if (action != null)
      this.categorie = action
    else
      this.categorie = new CategorieProduit();
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






/*
  public onAddCategorieProduit(addForm: NgForm): void {
    document.getElementById('add-CategorieProduit-form')!.click();
    this.categorieProduitService.save(addForm.value).subscribe(
      (response: CategorieProduit) => {
        console.error
        console.log(response);
        this.getCategorieProduits();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCategorieProduit(categorieProduit: CategorieProduit) {
    this.categorieProduitService.modifyCategorieProduit(categorieProduit).subscribe(
      (response: CategorieProduit) => {
        console.log(response);
        this.getCategorieProduits();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteCategorieProduit(idCategorieProduit: number): void {
    this.categorieProduitService.deleteCategorieProduit(idCategorieProduit).subscribe(() => { this.getCategorieProduits() });
  }
  public onOpenModal(categorieProduit: CategorieProduit, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editCategorieProduit = categorieProduit;
      button.setAttribute('data-target', '#updateCategorieProduitModal');
    }
    if (mode === 'delete') {
      this.deleteCategorieProduit = categorieProduit;
      button.setAttribute('data-target', '#deleteCategorieProduitModal');
    }
    if (mode === 'add') {

      button.setAttribute('data-target', '#addCategorieProduitModal');
    }
    container?.appendChild(button);
    button.click();
  }
*/


}

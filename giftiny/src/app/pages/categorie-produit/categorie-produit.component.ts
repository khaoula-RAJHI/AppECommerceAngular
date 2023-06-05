import { Component, OnInit } from '@angular/core';
import { CategorieProduit } from './categorie-produit';
import { CategorieProduitService } from './categorie-produit.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categorie-produit',
  templateUrl: './categorie-produit.component.html',
  styleUrls: ['./categorie-produit.component.css']
})
export class CategorieProduitComponent implements OnInit {

  public categories: CategorieProduit[] = [];
  public editCategorieProduit?: CategorieProduit;
  public deleteCategorieProduit?: CategorieProduit;

  constructor(private categorieProduitService: CategorieProduitService, private route: Router) {
  }

  ngOnInit(): void {
    this.getCategorieProduits();
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
        this.route.navigateByUrl('/home');
      }
    );
  }

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



}

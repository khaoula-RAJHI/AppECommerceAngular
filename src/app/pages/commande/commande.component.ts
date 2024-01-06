import { Component, OnInit } from '@angular/core';
import { Commande } from './commande';
import { CommandeService } from './commande.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CategorieProduit } from '../categorie-produit/categorie-produit';
import { CategorieProduitService } from '../categorie-produit/categorie-produit.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  commandes: Commande[];
  public categories: CategorieProduit[] = [];
  form: boolean = false;
  commande: Commande = new Commande();
  closeResult!: string;
  idCategorieProduit: number;

  constructor(
    private commandeService: CommandeService,
    private categorieProduitService: CategorieProduitService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAllCommandes();
  }

  getAllCommandes() {
    this.commandeService.getAllCommandes().subscribe(
      (res: Commande[]) => this.commandes = res,
      (error: HttpErrorResponse) => console.error(error)
    );
  }


  addCommande(commande: Commande) {
    this.commandeService.saveCommande(commande).subscribe(
      () => {
        this.getAllCommandes();
        this.form = false;
      },
      (error: HttpErrorResponse) => console.error(error)
    );
  }


  deleteCommande(idCommande: number) {
    this.commandeService.removeCommande(idCommande).subscribe(
      () => this.getAllCommandes(),
      (error: HttpErrorResponse) => console.error(error)
    );
  }

  open(content: any, action: any) {
    if (action != null) {
      // Logic for editing existing commande
      // You might need to implement the logic based on your application requirements
      this.commande = action;
    } else {
      // Logic for adding a new commande
      // You might need to initialize a new commande object or reset some form data
      this.commande = new Commande();
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
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

}

import { Component, OnInit } from '@angular/core';
import { Commande } from './commande';
import { CommandeService } from './commande.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Role } from '../User/role';
import { CategorieProduit } from '../categorie-produit/categorie-produit';
import { User } from '../User/user';

export interface Produit {
  idProduit : number;
  codeProduit : string;
  libelleProduit : string;
  prix : number;
  dateCreation:Date;
  categorieProduit: CategorieProduit; 
}
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  currentUser: any;
  commandes: any;
  form: boolean = false;
  commande!: Commande ;
  closeResult!: string;
  cmdId: number;
  productId: number;
  selectedCmdId: number;
  selectedProductId: number;
  selectedProduct:  Produit | null = null;
  public produits: Produit[] = [];
  userId: number;
  selectedUserId: number;
  selectedUser:  User | null = null;
  public users: User[] = [];

  constructor(
    private commandeService: CommandeService,
    private modalService: NgbModal,
    private token: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.getAllCommandes();
    this.getAllProducts();
    this.getAllUsers();
    this.loadCommandes();
    this.currentUser = this.token.getUser();
    this.commande = {
      idCommande: null,
      quantite: null,
      user: null,
      produits: null,
  
    }
    this.selectedProduct = null;
    this.selectedUser = null;
  }

  loadCommandes() {
    this.commandeService.getAllCommandes().subscribe((data: Commande[]) => {
        this.commandes = data;
    });
}

  getAllCommandes() {
    this.commandeService.getAllCommandes().subscribe(res => this.commandes = res);
  }
  


  public getAllProducts(): void {
    this.commandeService.displayProducts().subscribe(
      produits => {
        this.produits = produits;
      },
      error => {
        console.log('Erreur lors de la récupération des produits', error);
      }
    );
  }

  public getAllUsers(): void {
    this.commandeService.displayUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.log('Erreur lors de la récupération des produits', error);
      }
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
      this.commande = action;
    } else 
      this.commande = new Commande();
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

  addcmd() {
    console.log('Selected productId:', this.selectedProductId);
  
    if (this.selectedProductId != null) {
      this.commandeService.addcmd(this.selectedCmdId, this.selectedProductId)
        .subscribe(
          data => {
            const commandeId = data.id; 
            console.log('Ajout de la commande réussi. ID de la commande :', commandeId);
            this.getAllCommandes();
          },
          error => {
            console.error('Erreur lors de l\'ajout de la commande', error);
          }
        );
    } else {
      console.log('La sélection de la commande n\'est pas valide.');
    }
  }

}

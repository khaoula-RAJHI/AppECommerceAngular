import { User } from "../User/user";
import { Produit } from "./commande.component";

export class Commande {
    idCommande: number;
    quantite: number;
    user: User[]; 
    produits: Produit[]; 
    
      
      
}

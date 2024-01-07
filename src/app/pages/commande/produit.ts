import { CategorieProduit } from "../categorie-produit/categorie-produit";

export class Produit {
    idProduit : number;
    codeProduit : string;
    libelleProduit : string;
    prix : number;
    dateCreation:Date;
    categorieProduit: CategorieProduit; 
}

import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { User } from './user';
import { UserService } from './user.service';
import { Produit } from '../produit/produit';
import { CategorieProduit } from '../categorie-produit/categorie-produit';
import { ProduitService } from '../produit/produit.service';
import { CategorieProduitService } from '../categorie-produit/categorie-produit.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  users: any;
  produits: any;
  categories: any;
  form: boolean = false;
  user!: User;
  produit!: Produit;
  categorie!: CategorieProduit;

  constructor(private userService: UserService, private produitService: ProduitService,private categorieProduitService: CategorieProduitService) {
  }

  ngOnInit() {

    this.getAllUsers();
    this.user = {
      idUser: null,
      email: null,
      password: null,
      username: null,

    }

    this.getAllProducts();
    this.getAllCategorieProduits();

    this.produit = {
      idProduit: null,
      codeProduit: null,
      libelleProduit: null,
      prix: null,
      dateCreation: null,
      categorieProduit: null

    }

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }


  getAllUsers() {
    this.userService.getUsers().subscribe(res => this.users = res)
  }

  getAllProducts() {
    this.produitService.getProduits().subscribe(res => this.produits = res)
  }

  public getAllCategorieProduits(): void {
    this.categorieProduitService.getCategorieProduits().subscribe(res => this.categories = res);
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}

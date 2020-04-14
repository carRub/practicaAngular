import { Component, OnInit } from '@angular/core';
import { Product } from '../../Product';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductsService } from '../../products.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  //URL and search bar values
  searchValue = '';
  currentURL = '';
  monitor = false;
  selectedCount = 0;

  // monitored products and products in general
  products: Product[];
  monitoredProductsSet: Set<any>;
  monitoredProductsArray: Product[];
  searchResult: Product[];

  // Observables subscriptions
  private productsSubscription: Subscription;
  private monitoredProductsSubscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private productService: ProductsService) {
                this.products = this.productService.getProducts();
                this.monitoredProductsSet = this.productService.getMonitoredProducts();
              }

  ngOnInit(): void {

    this.productsSubscription = this.productService.productsSubject.subscribe(
      (newProducts: Product[]) => {
        this.products = newProducts;
      }
    );

    this.monitoredProductsSubscription = this.productService.monitoredProductsSubject.subscribe(
      (newMonitoredProducts: Set<any>) => {
        this.monitoredProductsSet = newMonitoredProducts;
        this.updateMonitoredProducts();
      }
    );

    this.currentURL = this.router.url;
    this.searchResult = this.products;
    if (this.currentURL === '/monitor') {
      this.monitor = true;
      this.updateMonitoredProducts();
    }
  }

  search() {
    console.log('this is search', this.searchValue);
    if (this.currentURL === '/product') {
      this.monitor = false;
      this.searchResult = this.products.filter(o => o.nombre.toUpperCase().includes(this.searchValue.toUpperCase()) ||
      o.descripcion.toUpperCase().includes(this.searchValue.toUpperCase()));
    } // else //this.monitor = true
  }

  updateMonitoredProducts() {
    console.log('updatemonitoredproducts');
    this.monitoredProductsArray = [];
    this.monitoredProductsSet.forEach( o => {
      const tempProduct = this.products.filter(x => x.uid === o);
      if (tempProduct) {
        this.monitoredProductsArray.push(tempProduct[0]);
      }
    });
    console.log(this.monitoredProductsArray);
  }

  addMonitoredProducts(object) {
    if (object.checked) {
      this.productService.addMonitoredProduct(object.uid);
    } else {
      this.productService.deleteMonitoredProduct(object.uid);
    }
  }

  howManyAreSelected(message) {
    this.selectedCount = message;
  }

}

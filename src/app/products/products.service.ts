import { Injectable } from '@angular/core';
import { Product, Especificacion } from './Product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // array with all the existing products
  products: Product[];
  // set with all the monitor products ids
  monitoredProducts = new Set();
  // To use in the contructor
  dummySpecification: Especificacion[];

  // Subjects
  productsSubject = new Subject<Product[]>();
  monitoredProductsSubject = new Subject<Set<any>>();


  constructor() {
    this.products = [new Product(1, 'smartTV', 'Samsung', 'Samsung 50 inches', 15000, 13, this.dummySpecification),
                    new Product(2, 'smartPhone', 'Huawei', 'Huawei P30', 5500, 10, this.dummySpecification),
                    new Product(3, 'smartWatch', 'HTC', 'HTC smartwatch', 3500, 8, this.dummySpecification),
                    new Product(4, 'smartFridge', 'GE', 'GE smartFridge 15 inches', 25000, 5, this.dummySpecification),
                    new Product(5, 'Alexa', 'Amazon', 'Amazon Alexa', 2500, 12, this.dummySpecification)];
  }

  // get
  getProducts(): Product[] {
    return this.products.slice();
  }

  getMonitoredProducts(): Set<any> {
    return new Set(this.monitoredProducts);
  }

  // add
  addProduct(product) {
    console.log('adding a new product');
    this.products.push(product);
    this.productsSubject.next(this.getProducts());
  }

  addMonitoredProduct(id) {
    console.log('adding a monitored product');
    this.monitoredProducts.add(id);
    this.monitoredProductsSubject.next(this.getMonitoredProducts());
  }

  // delete
  deleteProduct(id) {
    console.log('deleting');

    // checking if we need to delete something from the monitored products
    if (this.monitoredProducts.has(id)) {
      this.deleteMonitoredProduct(id);
    }

    this.products.splice(this.products.findIndex(o => o.uid === id), 1);
    this.productsSubject.next(this.getProducts());
  }

  deleteMonitoredProduct(id) {
    console.log('deleting monitored product');
    this.monitoredProducts.delete(id);
    this.monitoredProductsSubject.next(this.getMonitoredProducts());
  }

  // update TODO: check if the product changes on the monitored

}

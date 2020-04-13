import { Injectable } from '@angular/core';
import { Product, Especificacion } from './Product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // array with all the existing products
  products: Product[];
  // array with all the monitor products ids
  monitoredProducts: number[];
  // To use in the contructor
  dummySpecification: Especificacion[];

  // Subjects
  productsSubject = new Subject<Product[]>();
  monitoredProductsSubject = new Subject<number[]>();


  constructor() {
    this.products = [new Product(1, 'smartTV', 'Samsung', 'Samsung smartTv', 15000, 13, this.dummySpecification),
                    new Product(1, 'smartPhone', 'Huawei', 'Huawei smartphone', 5500, 10, this.dummySpecification),
                    new Product(1, 'smartWathc', 'HTC', 'HTC smartwatch', 3500, 8, this.dummySpecification)];
  }

  getProducts(): Product[] {
    return this.products.slice();
  }

  // add

  // delete

  // update

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../Product';
import { ProductsService } from '../../../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() products: Product[];
  @Input() monitor: boolean;
  @Output() selected = new EventEmitter();
  @Output() howManySelected = new EventEmitter();
  selectedCount = 0;

  currentURL = '';

  constructor(private productService: ProductsService,
              private router: Router) { }

  ngOnInit(): void {
    console.log('this is product component', this.products);
    this.currentURL = this.router.url;
  }

  deleteProduct(id) {
    if (this.currentURL === '/product') {
      this.productService.deleteProduct(id);
    } else {
      this.productService.deleteMonitoredProduct(id);
    }
  }

  selectedItem(event, id) {
    if (event.target.checked) {
      this.selected.emit({uid: id, checked: true});
      this.selectedCount ++;
      this.howManySelected.emit(this.selectedCount);
    } else {
      this.selected.emit({uid: id, checked: false});
      this.selectedCount --;
      this.howManySelected.emit(this.selectedCount);
    }
  }

}

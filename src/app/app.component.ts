import { Component } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Product } from './types/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'code-value';
  products:Product[]=[];
  product:any;
  constructor(private productsService: ProductsService) {
    this.products=this.productsService.getProducts();
    this.product=this.products[0];
  }

  updateProducts(){
    this.products=this.productsService.getProducts();
  }

  updateProduct(){
    this.product=this.productsService.getCurrentProduct();
  }
}

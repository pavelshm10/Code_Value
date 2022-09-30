import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/types/product';

// interface Product {
//   ID: Number; //(number, unique
//   Name: String;  //(string, up to 30 characters, mandatory)
//   Description: String; //(string, up to 200 characters, optional)
//   Price: Number; //(number, larger than zero, mandatory)
//   Creation_Date: Date; //(Date, mandatory)
// }

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() currentProduct = new EventEmitter();
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.handleProductClick(this.products[0]);
    }, 0);
  }

  handleProductClick(p: Product) {
    const pre_product = this.productsService.getCurrentProduct();
    this.productsService.setCurrentProduct(p);
    this.currentProduct.emit();
    if (pre_product) {
      if (p.ID !== pre_product.ID) {
        this.colorProduct(p.ID.toString(), '#DCDCDC');
        this.colorProduct(pre_product.ID.toString(), 'white');
      } else {
        this.colorProduct(p.ID.toString(), '#DCDCDC');
      }
    } else {
      this.colorProduct(p.ID.toString(), '#DCDCDC');
    }
  }

  colorProduct(id: string, color: string) {
    const product = document.getElementById(id);

    if (product) {
      product.style.backgroundColor = color;
    }
  }

  deleteProduct(id: number) {
    this.products = this.productsService.deleteProduct(id);
  }

  addProduct(product: Product) {
    this.products = this.productsService.addProduct(product);
  }

  editProduct(product: Product) {
    this.products = this.productsService.editProduct(product);
  }
}

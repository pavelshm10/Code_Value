import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: any;
  @Output() editProduct = new EventEmitter();
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.preventDefaultOnClick();
  }

  preventDefaultOnClick() {
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function (event) {
        event.preventDefault();
      });
    }
  }

  onSave() {
    this.productsService.editProduct(this.product);
    this.editProduct.emit();
  }
}

import { Injectable } from '@angular/core';
import { catchError, ConnectableObservable, of, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import products from '../../assets/mock.json';
import { Product } from '../types/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[]=[];
  currentProduct: any;

  constructor() {
    this.products=products;
    this.currentProduct=products[0];
  }

  getProducts(){
    return this.products;
  }

  deleteProduct(id: number) {
    return (this.products = this.products.filter((item) => item.ID != id));
  }

  setCurrentProduct(p: Product) {
    this.currentProduct = p;
  }

  getCurrentProduct(){
    return this.currentProduct;
  //   return this.http.get<Product[]>('../../assets/mock.json').pipe(
  //     tap((product: Product[]) => this.currentProduct = product),
  //     catchError(this.handleError<any>("get", {})),
  // );
  }

  addProduct(product: Product) {
    this.products.push(product);
    return this.products;
  }

  editProduct(product: Product) {
    const id=this.products.find((p, i) => p.ID === product.ID)?.ID;

    id ? this.products[id-1]=product : '';
    return this.products;
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return operation === "adminSendInvitations"
        ? of(error.error as T)
        : of(result as T);
    };
  }
}

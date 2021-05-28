import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToCartService {

  constructor(public http: HttpClient) {}

  public itemsInCart = [];
  public pricesOfItemsInCart = [];

  addToCart(product){
    this.itemsInCart.push(product);
    this.pricesOfItemsInCart.push(product.prodPrice)
  }

  getItems(){
    return this.itemsInCart;
  }

  clearCart(){
    this.itemsInCart = [];
    return this.itemsInCart;
  }

  getPrices(){
    var grandTotal = 0;
    this.pricesOfItemsInCart.forEach(element => {
      grandTotal += element;
    });
    return grandTotal;
  }
}

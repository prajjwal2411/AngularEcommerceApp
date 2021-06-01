import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToCartService {

  public productUrl = "http://localhost:3000/productInfo";
  public userUrl = "http://localhost:3000/userInfo/";

  constructor(public http: HttpClient) {}

  public itemsInCart = [];
  public pricesOfItemsInCart = [];

  getData(userID):Observable<any>{
    return this.http.get(this.userUrl+userID.toString());
  }

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

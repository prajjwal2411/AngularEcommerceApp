import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public inCartInfo: any;
  public productIds: any;
  public productIndex: any = -1;
  public grandTotal: any = 0;
  
  public currentUserInfo: any;
  public currentUserId: any;

  public productsInCart: any = []
  public productInfo: any;

  constructor(public http: HttpClient,
    ) { }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem("userLoggedIn");

    this.http.get("http://localhost:3000/userInfo/" + `${this.currentUserId}`).subscribe((userInfo) => {
      this.currentUserInfo = userInfo;
      console.log(this.currentUserInfo);
      this.inCartInfo = this.currentUserInfo.userCart;
      this.showProducts(this.inCartInfo)
    })
  }

  getData(){
    this.http.get("http://localhost:3000/productInfo").subscribe((data)=>{
      this.productInfo = data;
    })
  }

  showProducts(productInfo){
    console.log(productInfo);
    productInfo.forEach(element => {
      console.log(element);
      this.grandTotal += element.prodPrice;
    })
  }

}




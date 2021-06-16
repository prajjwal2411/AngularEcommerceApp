import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  public inCartInfo: any = [];
  public productIds: any;
  public productIndex: any = -1;
  public grandTotal: any = 0;
  
  public currentUserInfo: any;
  public currentUserId: any;
  public itemsInCart

  constructor(
    public http: HttpClient,
  ) {}
  
  ngOnInit(): void {
    this.currentUserId = localStorage.getItem("userLoggedIn");

    this.http.get("http://localhost:3000/userInfo/"+`${this.currentUserId}`).subscribe((data)=>{
      setTimeout(() => {
        this.currentUserInfo = data;
      }, 2000);
    })
    setTimeout(() => {
      console.log(this.currentUserInfo)
      this.productDataToDisplay();
    }, 3000);
  }
  
  
  productDataToDisplay(){
    //console.log(this.currentUserInfo); WORKING FINE
    
    this.productIds = this.currentUserInfo.userCart
    //console.log(this.productIds); WORKING FINE

    this.productIds.forEach(element => {
      this.http.get("http://localhost:3000/productInfo/"+`${element}`).subscribe((data)=>{
        this.inCartInfo.push(data);
        console.log(this.inCartInfo.id);
      })  
    });
  }  

  

}

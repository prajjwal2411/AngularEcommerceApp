import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public inCartInfo: any = [];
  public productIds: any;
  public productIndex: any = -1;
  public grandTotal: any = 0;
  
  public currentUserInfo: any;
  public currentUserId: any;

  constructor(public http: HttpClient,
    ) { }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem("userLoggedIn");

    this.http.get("http://localhost:3000/userInfo/"+`${this.currentUserId}`).subscribe((data)=>{
      this.currentUserInfo = data;
    })

  }

  productDataToDisplay(){
    //console.log(this.currentUserInfo); WORKING FINE
    
    this.productIds = this.currentUserInfo.userCart
    //console.log(this.productIds); WORKING FINE

    this.productIds.forEach(element => {
      this.http.get("http://localhost:3000/productInfo/"+`${element}`).subscribe((data)=>{
      this.inCartInfo.push(data);
      //console.log(this.inCartInfo.id);
    })  
  });
  }  


}

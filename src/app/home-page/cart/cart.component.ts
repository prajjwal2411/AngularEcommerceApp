import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToCartService } from '../../Services/to-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public inCartInfo: any;
  public productIds: any;
  public productIndex: any = -1;
  
  public currentUserInfo: any;
  public currentUserId: any;
  
  public productsInCart: any = []
  public productInfo: any;
  public grandTotal: any = 0;
  
  constructor(public http: HttpClient, public cartService: ToCartService
    ) {}
    
    ngOnInit(): void {
      this.currentUserId = localStorage.getItem("userLoggedIn");
      
      this.http.get("http://localhost:3000/userInfo/" + `${this.currentUserId}`).subscribe((userInfo) => {
        setTimeout(() => {
          this.currentUserInfo = userInfo;
          this.inCartInfo = this.currentUserInfo.userCart;
          this.showProducts(this.inCartInfo)
        }, 1000);
      })
    }
    
    showProducts(productInfo){
      var sum = 0;
      console.log(this.inCartInfo);
      productInfo.forEach(element => {
        this.http.get("http://localhost:3000/productInfo/"+`${element}`).subscribe((data)=>{
          this.productsInCart.push(data);
        })
      })  
      //this.grandTotal += this.productsInCart.prodPrice;
    }
    
    public items =  this.cartService.getItems(); 
    
    getData(){
      this.http.get("http://localhost:3000/productInfo").subscribe((data)=>{
        this.productInfo = data;
      })
    }
  }
  
  


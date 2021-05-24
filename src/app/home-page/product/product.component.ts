import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: any;
  @Output() productAdded = new EventEmitter();

  //URLs
  public userUrl: any = "http://localhost:3000/userInfo";
  public productUrl: any = "http://localhost:3000/productInfo";

  //Route Variables
  public routeSub: Subscription;

  //Information Variables
  public userInfo: any;
  public productInfo: any;
  public currentUser: any;
  public currentUserId: any;
  public numberOfItemsInCart: any = 0;
  
  public searchText: any;
  public sortSelect: any;

  public tempUser: any;

  constructor(
    public http: HttpClient, 
    public _route: ActivatedRoute,
    public router: Router,
    ) {
      this.searchText = "";
      this.sortSelect = "";
    }
    
    ngOnInit(): void {
      this.routeSub = this._route.params.subscribe(params => {
        this.currentUserId = params['id'];
      })
      
      this.getData();
      if(localStorage.getItem("userLogggedIn")){
        this.numberOfItemsInCart = this.userInfo.userCart.length;
      }else{
        this.numberOfItemsInCart = 0;
      }
  }

  getData(){
    //Fetching User's Data
    this.http.get("http://localhost:3000/userInfo").subscribe(data=>{
      this.userInfo = data       
    })

    //Fetching Product's Data
    this.http.get("http://localhost:3000/productInfo").subscribe(data=>{
      this.productInfo = data;
    })
  }

  sort(someValue){
    
    switch (someValue.value){
      case "low":{
        this.productInfo = this.productInfo.sort((low, high) => low.prodPrice - high.prodPrice)
        break;
      }
      case "high":{
        this.productInfo = this.productInfo.sort((low, high) => high.prodPrice - low.prodPrice)
        break;
      }
      default:{
        this.productInfo = this.productInfo.sort((low, high) => low.prodPrice - high.prodPrice)
        break;
      }
    }
    return this.productInfo;
  }
        
  searchFunction(event){
    this.searchText = event.target.value;
  }

  addToCart(productId){
    if(localStorage.getItem("userLoggedIn")){
      //Emitting the data to cart component
      this.productAdded.emit(productId);
      
      //Getting the ID of current logged in user
      this.currentUser = localStorage.getItem("userLoggedIn");

      //Storing the info of logged in user
      this.tempUser = this.userInfo[this.currentUser - 1];

      //Pushing the item in the user's cart array
      this.tempUser.userCart.push(productId);

      //Displaying the number of items in the cart every time an item is added.
      this.numberOfItemsInCart = this.tempUser.userCart.length;
            
      this.http.put("http://localhost:3000/userInfo/"+`${this.currentUser}`, this.tempUser).subscribe();

      alert("Item Added to cart")
    }
    else{
      alert("Please Login First If you want to buy something")
    }
  }

  toCheckoutPage(){
    if(localStorage.getItem("userLoggedIn")){
      this.router.navigateByUrl('cart/'+`${this.currentUserId}`);
    }
    else{
      alert("Please Login First If you want to buy something");
      this.router.navigateByUrl('');
    }
  }

}
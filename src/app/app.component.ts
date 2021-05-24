import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopping App';

  public routeSub: Subscription;
  public currentUserId: any = localStorage.getItem("userLoggedIn") 

  public itemsInCart = 0;

  public toDisplay: boolean = false;
  
  ngOnInit(): void{

  }
  
  constructor(
    public router: Router, 
    ) {}
    
  
  toLogin(){
    if(!localStorage.getItem("userLoggedIn")){
    this.router.navigateByUrl('login');}
    else{
      alert("Please Logout First")
    }
  }

  toLogout(){
    if(localStorage.getItem("userLoggedIn")){
      localStorage.removeItem("userLoggedIn");
      this.router.navigateByUrl('home');
    }else{
      alert("Please Login First")
    }
  }

  toHome(){
    if(localStorage.getItem("userLoggedIn")){
      this.router.navigateByUrl('home/'+`${this.currentUserId}`);
    }else{
      this.router.navigateByUrl('home');
    }
  }

  

}

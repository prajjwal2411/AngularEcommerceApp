import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public userUrl: any = "http://localhost:3000/userInfo";
  public productUrl: any = "http://localhost:3000/productInfo"

  public userInfo: any;

  constructor(
    public http: HttpClient,
    public router: Router
    ) {this.userUrl= "http://localhost:3000/userInfo";
    this.getData();}

   ngOnInit() {
    
   }

  getData(){
    this.http.get(this.userUrl).subscribe(data => {
      this.userInfo = data;
    })
  } 

  registerService(registerFormData)
  {
    this.userInfo.forEach(element => {
      if(element.userEmail === registerFormData.userEmail){
        alert("This email is already registered, please try to login");
        return false;
      }
    });
    this.http.post(this.userUrl, registerFormData).subscribe();
    this.router.navigateByUrl('verify');
  }
}

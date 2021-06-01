import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public userUrl: any = "http://localhost:3000/userInfo";
  public productUrl: any = "http://localhost:3000/productInfo"

  public currentUserInfo: any;
  public userInfo: any;

  public toVerification: any;

  constructor(
    public http: HttpClient,
    public router: Router
    ) {this.userUrl= "http://localhost:3000/userInfo";
    this.getData();}

   ngOnInit() {
     this.getData();
     console.log();
     
   }

  getData(){
    this.http.get("http://localhost:3000/userInfo").subscribe(data => {
      this.userInfo = data;
      //console.log(this.userInfo);
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

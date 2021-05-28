import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public userUrl: any;
  public productUrl: any = "http://localhost:3000/productInfo"

  public userInfo: any;
  public ifRegistered: boolean = false;
  public locationId: number;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.userUrl = "http://localhost:3000/userInfo";
    this.getData();
  }

  ngOnInit() { }

  getData() {
    this.http.get("http://localhost:3000/userInfo").subscribe(data => {
      this.userInfo = data;
    })
  }

  registerCheckFunction(loginFormData) {
    this.getData();
    //console.log(this.userInfo);
    //console.log(loginFormData.loginEmail);
    this.userInfo.forEach(element => {
      if (loginFormData.loginEmail === element.userEmail) {
        //console.log(element.userEmail);
        this.locationId = element.id - 1;
        this.ifRegistered = true;
        //window.location.reload();
      }
    });
    if (!this.ifRegistered) { return false; }
  }


  loginService(loginFormData) {

    this.registerCheckFunction(loginFormData)

    if (this.ifRegistered) {
      if (this.userInfo[this.locationId].isVerified) {
        if (loginFormData.loginEmail === this.userInfo[this.locationId].userEmail && loginFormData.loginPwd === this.userInfo[this.locationId].userPwd) {
          //this.userInfo[this.locationId].isLoggedIn = true;
          localStorage.setItem("userLoggedIn", this.userInfo[this.locationId].id);
          
          //this.http.put(this.userUrl+'/'+this.userInfo[this.locationId].id.toString(), this.userInfo).subscribe((data)=>{ this.userInfo = data })
          this.router.navigateByUrl('home' + '/' + this.userInfo[this.locationId].id.toString())
        }
        else {
          alert("Wrong Credentials");
        }
      }
      else {
        alert("You are not verified");
        this.router.navigateByUrl('verify');
      }
    }
    else {
      console.log("none");
    }
  }

}

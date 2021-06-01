import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterService } from '../../Services/register.service';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  public userUrl: any = "http://localhost:3000/userInfo";

  public userInfo: any;
  public thatValue: any;
  public mail: string;
  public some_user: any;
  public inputOtp: any;
  public otp: any;
  public appName: any = "ShopApp";

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private fromRegister: RegisterService,
    private fromLogin: LoginService
    ) {
    this.some_user = "";
    this.mail = "";
    this.inputOtp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    var loading = true;
    var errorMessage = "";

    this.fromLogin.getUserData().subscribe((response)=>{
      console.log('response received');
      setTimeout(() => {
        this.userInfo = response;
      }, 2000);
    },(error) => {
      console.error("Request failed with error");
      errorMessage = error;
      loading = false;
    },() => {
      console.log('Request Completed');
      loading = false;
    });
  }

  checkFunction() {
    //console.log(this.userInfo);
    this.userInfo.forEach(element => {
      if (this.mail === element.userEmail) {
        this.some_user = element.userName;
        //console.log(this.some_user)
        //console.log(this.currentUserInfo.userEmail)
        this.thatValue = true;
      } else {
        return;
      }
    })
  }

  public sendEmail(e: Event) {
    this.getData();
    this.checkFunction()
    //console.log(this.thatValue);
    //console.log(this.userInfo);

    if (this.thatValue) {
      console.log(this.inputOtp);

      //EMAIL SENDING CODE COMMENTED TO SAVE EMAILS UNCOMMENT WHILE SHOWING
      e.preventDefault();
      emailjs.sendForm('service_hmf1brw', 'template_tiw81rh', e.target as HTMLFormElement, 'user_e2APVICPX2gilPF7lkoEA')
        .then((result: EmailJSResponseStatus) => {
          console.log(result.text);
          alert("OTP Sent Please Check your Mail")
        }, (error) => {
          console.log(error.text);
        });
      //EMAIL SENDING CODE COMMENTED TO SAVE EMAILS UNCOMMENT WHILE SHOWING
    }
    else {
      if (this.mail === "") {
        alert("please enter email id");
      } else {
        console.log("none");
      }
    }
  }

  verify() {
    if (this.otp == this.inputOtp) {
      alert("You are Verified Now, You Will be Redirected to Login Page");
      this.otp = "";
      this.userInfo.forEach(element => {
        if ((this.mail === element.userEmail) && (element.isVerified == false)) {
          element.isVerified = true;
          //console.log(element);
          this.http.put("http://localhost:3000/userInfo" + '/' + element.id.toString(), element).subscribe((data) => { })
          this.router.navigateByUrl('login');
        }
      })
    }
  }

}


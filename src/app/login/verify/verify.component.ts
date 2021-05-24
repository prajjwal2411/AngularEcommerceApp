import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  //URLs
  public otp: any;
  public mail: any;
  public info: any;
  
  public inputOtp: any;
  public appName: any = "ShopApp";
  public some_user: any;
  
  constructor(private http: HttpClient, private router: Router) {
    this.some_user = "";
    this.mail = "";
    this.inputOtp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }
  
  ngOnInit(): void {
    this.getData();
  }
  
  getData(){
    this.http.get("http://localhost:3000/userInfo").subscribe((data) => {
      this.info = data;
    })
  }
  
  public thatValue: any = false;
  
  checkFunction(){    
    //console.log(this.info);
    this.info.forEach(element => {
      if(this.mail === element.userEmail){
        this.some_user = element.userName;
        //console.log(this.some_user)
        //console.log(element.userEmail)
        this.thatValue = true;
        return;    
      }
    });
  }

  public sendEmail(e: Event) {
    
    this.checkFunction()
    //console.log(this.thatValue);
    
    if(this.thatValue){
    console.log(this.inputOtp);
    
    e.preventDefault();
    emailjs.sendForm('service_hmf1brw', 'template_tiw81rh', e.target as HTMLFormElement, 'user_e2APVICPX2gilPF7lkoEA')
    .then((result: EmailJSResponseStatus) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
      });
    }
    else{
      if(this.mail === ""){
        alert("please enter email id");
      }else{
        alert("Please Enter Correct Email ID");
      }
    }
  }

  verify() {
    if (this.otp == this.inputOtp) {
      alert("You are Verified Now, You Will be Redirected to Login Page");
      this.otp = "";

      this.info.forEach(element => {
        if((this.mail === element.userEmail) && (element.isVerified == false))
        {
          element.isVerified = true;
          this.http.put("http://localhost:3000/userInfo"+'/'+element.id.toString(), element).subscribe((data)=>{})
          this.router.navigateByUrl('login');
        }
      });
    } 
  }

 
}

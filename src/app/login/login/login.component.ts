import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../../Services/get-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isSubmitted: Boolean = false;
  public userInfo: any;
  public userUrl = "http://localhost:3000/userInfo";
  public userId: any;

  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    public getData: GetDataService,
    public router: Router
  ) {
    //Start - Login Form
    this.loginForm = this.formBuilder.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPwd: ['', [Validators.required]],
    });
    //End - Register Form
  }

  ngOnInit(): void {

    //window.location.reload();
    this.getData.getUserData().subscribe(response => {
      setTimeout(() => {
        this.userInfo = response  
      }, 2000);
    })
    setTimeout(() => {
      console.log(this.userInfo);
    }, 3000);

  }

  //Start - Variables, Validation, FormControl & Submit Function of Login Form
  public loginForm: FormGroup;

  loginSubmit() {
    this.isSubmitted = true;
    let exist = true
    //console.log(this.loginForm.value)
    if (this.loginForm.valid) {
      exist = this.checkFunction(exist, this.loginForm.value.loginEmail);
      if (!exist) {
        localStorage.setItem("userLoggedIn", this.userId)
        this.router.navigateByUrl('home'+'/'+this.userId)
      } else {
        alert("Kindly Register Yourself First")
      }
    }
  }

  get returnLoginFormControl() {
    return this.loginForm.controls;
  }

  checkFunction(someBooleanValue, inputLoginValue) {
    for (let user of this.userInfo) {
      if ((user.userEmail === inputLoginValue) && user.isVerified) {
        this.userId = user.id;
        someBooleanValue = false;
        break;
      }
    }
    return someBooleanValue;
  }

  toRegister(){
    this.router.navigateByUrl('register');    
  }
  //End - Variables, Validation, FormControl & Submit Function of Login Form


}

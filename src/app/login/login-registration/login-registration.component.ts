import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../../Services/register.service';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css']
})

export class LoginRegistrationComponent implements OnInit {
  //Global Variables
  public isSubmitted: Boolean = false;
  public userInfo :any;

  ngOnInit(): void {
    localStorage.removeItem("userLoggedIn");
  }

  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    public regService: RegisterService,
    public logService: LoginService
    ) {   

    //Start - Register Form
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userPwd: ['', [Validators.required]],
      userConfirmPwd: ['', [Validators.required]],
      userPhone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      userAdd: ['', Validators.required],
      userPin: ['', [Validators.required, Validators.pattern('^[1-9]{1}[0-9]{2}[0-9]{3}$')]],
      userCartTry: [[]],
      userCart: [[]],
      userWishList: [[]],
      isLoggedIn: false,
      isVerified: false
    },{
      validator: this.checkIfMatchingPasswords('userPwd', 'userConfirmPwd')
    });
    //End - Register Form

    //Start - Login Form
    this.loginForm = this.formBuilder.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPwd: ['', Validators.required],
    });
    //End - Register Form
  }

  //Start - Variables, Validation, FormControl & Submit Function of Login Form
  public loginForm: FormGroup;

  loginSubmit(){
    this.isSubmitted = true;
    //console.log(this.loginForm.value)
    if(this.loginForm.valid)
    {
      this.logService.loginService(this.loginForm.value);
    }
  }
  
  get returnLoginFormControl(){
    return this.loginForm.controls;
  }

  //End - Variables, Validation, FormControl & Submit Function of Login Form

  //Start - Variables, Validation, FormControl & Submit Function of Register Form
  public registerForm: FormGroup;
  
  checkIfMatchingPasswords(password: string, passwordConfirm: string){
    return(formGroup: FormGroup) => {
      const mainPassword = formGroup.controls[password];
      const toMatchPassword = formGroup.controls[passwordConfirm];
      if(mainPassword.value !== toMatchPassword.value){
        toMatchPassword.setErrors({mustMatch:true})
      }
      else{
        toMatchPassword.setErrors(null)
      }
    }
  }

  get returnFormControl(){
    return this.registerForm.controls;
  }
 
  registerSubmit(){
    this.isSubmitted = true;
    if(this.registerForm.valid)
    {
      this.regService.registerService(this.registerForm.value);
      this.toToggle();
    }
  }
  //End - Variables, Validation, FormControl & Submit Function of Register Form

  //Start - To Switch between Login and Registration Form 
  public show: boolean = true;
  public buttonTitle: string = "Register";

  toToggle(){
    this.show = !(this.show);

    if(this.show){
      this.buttonTitle = "Register";
    }else{
      this.buttonTitle = "Login";
    }
  }
  //End - To Switch between Login and Registration Form
}

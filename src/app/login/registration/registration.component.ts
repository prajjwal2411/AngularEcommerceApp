import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from '../../Services/get-data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public isSubmitted: Boolean = false;
  public userInfo: any;
  public userUrl: any = "http://localhost:3000/userInfo";

  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    public getData: GetDataService,
    public router: Router
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
    }, {
      validator: this.checkIfMatchingPasswords('userPwd', 'userConfirmPwd')
    });
    //End - Register Form

  }

  ngOnInit(): void {
    this.getData.getUserData().subscribe(response => {
      this.userInfo = response
    })
    setTimeout(() => {
      console.log(this.userInfo, 'register');
    }, 3000);
  }

  //Start - Variables, Validation, FormControl & Submit Function of Register Form
  public registerForm: FormGroup;

  checkIfMatchingPasswords(password: string, passwordConfirm: string) {
    return (formGroup: FormGroup) => {
      const mainPassword = formGroup.controls[password];
      const toMatchPassword = formGroup.controls[passwordConfirm];
      if (mainPassword.value !== toMatchPassword.value) {
        toMatchPassword.setErrors({ mustMatch: true })
      }
      else {
        toMatchPassword.setErrors(null)
      }
    }
  }

  get returnFormControl() {
    return this.registerForm.controls;
  }

  registerSubmit() {
    this.isSubmitted = true;
    let exist = false;
    if (this.registerForm.valid) {
      exist = this.checkFunction(exist, this.registerForm.value.userEmail)
      if (!exist) {
        this.http.post(this.userUrl, this.registerForm.value).subscribe();
        alert("Registered")
        this.router.navigateByUrl('verify');
      } else {
        alert("Email already exist");
      }
    }
  }

  checkFunction(someBooleanValue, inputEmail) {
    for (let user of this.userInfo) {
      if (user.userEmail === inputEmail) {
        someBooleanValue = true;
        break;
      }
    }
    return someBooleanValue;
  }

  toLogin(){
    this.router.navigateByUrl('login');    
  }

  //End - Variables, Validation, FormControl & Submit Function of Register Form


}

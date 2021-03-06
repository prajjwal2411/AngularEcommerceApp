import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { VerifyComponent } from './verify/verify.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

import { MatInputModule } from '@angular/material/input';

const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  }
]

@NgModule({
  declarations: [
    VerifyComponent, 
    RegistrationComponent, 
    LoginComponent
  ],

  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(loginRoutes)
  ]
})
export class LoginModule { }

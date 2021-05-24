import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginRegistrationComponent } from './login-registration/login-registration.component';

import { MatInputModule } from '@angular/material/input';
import { VerifyComponent } from './verify/verify.component';

const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginRegistrationComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'verify',
    component: VerifyComponent
  }
]

@NgModule({
  declarations: [LoginRegistrationComponent, VerifyComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(loginRoutes)
  ]
})
export class LoginModule { }

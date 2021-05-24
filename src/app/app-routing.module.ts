import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageModule } from './home-page/home-page.module';
import { LoginModule } from './login/login.module';
import { CheckoutModule } from './checkout/checkout.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomePageModule,
    LoginModule,
    CheckoutModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

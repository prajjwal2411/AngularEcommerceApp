import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product/product.component';

import { FilterPipePipe } from '../Pipes/filter-pipe.pipe'
import { LoginGuard } from '../Guards/login.guard';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from  '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CartComponent } from './cart/cart.component';

const homeRoutes: Routes = [
  {
    path: 'cart/:id',
    component: CartComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'home/:id',
    component: ProductComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'home',
    component: ProductComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    ProductComponent,
    FilterPipePipe,
    CartComponent 
  ],
  
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTooltipModule,
    RouterModule.forRoot(homeRoutes)
  ]
})
export class HomePageModule { }

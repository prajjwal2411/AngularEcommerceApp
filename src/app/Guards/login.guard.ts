import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(public router: Router){}

  canActivate() {
    if(localStorage.getItem("userLoggedIn")){return true;}
    
    else{this.router.navigateByUrl(''); return false;}
  }
  
}

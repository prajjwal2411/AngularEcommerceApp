import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  public userUrl: any = "http://localhost:3000/userInfo";
  public productUrl: any = "http://localhost:3000/productInfo";

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any>{
    return this.http.get(this.userUrl);
  }

  getProductData(): Observable<any>{
    return this.http.get(this.productUrl);
  }

  getCurrentUserData(id): Observable<any>{
    return this.http.get(this.userUrl+'/'+id.toString());
  }
}

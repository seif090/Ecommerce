import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem("token")){
      let token: string | null = localStorage.getItem("token")
      if (token != null){
        let data = jwtDecode(token)
        console.log(data);
        this.saveUserData(data);
      }
    }
  }
  baseUrl: string = 'https://ecommerce.routemisr.com'

  userData: BehaviorSubject<any> = new BehaviorSubject(null)

  saveUserData(data: any){
    this.userData.next(data)
  }

  register(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`, data);
  }

  login(data: any): Observable<any> {
 
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`, data);
  }

  signOut(){
    localStorage.removeItem("token")
    this.saveUserData(null)
    this._Router.navigate(['/login'])
  }

 forgotPasswords(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`, data);
  }

  verifyResetCode(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`, data);
  }
  
  resetPassword(data: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`, data);
  }
}


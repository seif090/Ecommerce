import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = 'https://ecommerce.routemisr.com'

  constructor(private _http: HttpClient) {}
  
  getAllProducts(page: string): Observable<any>{
    return this._http.get(`${this.baseUrl}/api/v1/products?page=${page}`);
  }

  getSomeProducts(): Observable<any>{
    return this._http.get(`${this.baseUrl}/api/v1/products`);
  }

  getDetails(id: string): Observable<any>{
    return this._http.get(`${this.baseUrl}/api/v1/products/${id}`)
  }

  getAllCategory(): Observable<any>{
    return this._http.get(`${this.baseUrl}/api/v1/categories`);
  }

  getCetogoryDetails(id:string|null): Observable<any>{
    return this._http.get(`${this.baseUrl}/api/v1/categories/${id}`);
  }

  getAllSubcategories(): Observable<any>{
    return this._http.get(`${this.baseUrl}/api/v1/subcategories`);
  }
}

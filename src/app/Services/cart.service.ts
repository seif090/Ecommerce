import { product } from './../interfaces/products';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: string ="https://ecommerce.routemisr.com"
  cartCount: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(private _http: HttpClient) { 
    if (localStorage.getItem("token")){
      this.getAllProduct().subscribe({
        next:(response)=>{
          this.changeCartCount(response.numOfCartItems)
        }
      })
    }
  }

  headerData: any = {
    token: localStorage.getItem("token")
  }

  addProductToCart(id: string): Observable<any>{
    let body={productId: id}
    return this._http.post(`${this.baseUrl}/api/v1/cart`, body,
    {
      headers: this.headerData
    })
  }

  getAllProduct(): Observable<any>{
     return this._http.get(`${this.baseUrl}/api/v1/cart`,
    {
      headers: this.headerData
    }) 
  }

  deleteProduct(id:string): Observable<any>{
    return this._http.delete(`${this.baseUrl}/api/v1/cart/${id}`,
    {
      headers: this.headerData
    })
}

clearCart(): Observable<any>{
  return this._http.delete(`${this.baseUrl}/api/v1/cart/`,
  {
    headers: this.headerData
  })
}

updateCartQuantity(id:string, count:number): Observable<any>{
  let body={
    count:count
  }
  return this._http.put(`${this.baseUrl}/api/v1/cart/${id}`,body,
  {
    headers: this.headerData
  })
}

changeCartCount(data:number){
  this.cartCount.next(data)
}

checkPayment(cartId:string, dataShipping:any): Observable<any>{
  let body = {
    shippingAddress: dataShipping
  }

  return this._http.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost=4200`,body,
  {
    headers: this.headerData
  })
}
}
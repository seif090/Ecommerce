import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishListCount: BehaviorSubject<number> = new BehaviorSubject(0);

  headerData: any = {
    token: localStorage.getItem("token")
  }
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/'

  constructor(private _HttpClient: HttpClient) { }

  addToWishList(prodId: string | undefined): Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'wishlist', 
    {
      productId : prodId
    },
    {
      headers: this.headerData
    })
  }

  getWishList(): Observable<any>{
    return this._HttpClient.get(this.baseUrl + "wishlist", 
    {
      headers: this.headerData
    })
}

removeWishListItem(prodId: string | undefined): Observable<any>{
  return this._HttpClient.delete(this.baseUrl + `wishlist/${prodId}`, 
  {
    headers: this.headerData
  })
}
}
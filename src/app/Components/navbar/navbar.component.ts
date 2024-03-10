import { WishlistService } from 'src/app/Services/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  isLogin: any = null; //to check if the user logged in or not 
  count:number = 0 //Cart counter
  WishCount:number = 0 //Wishlist counter

  constructor(private _auth: AuthService, private _CartService: CartService, private _WishlistService: WishlistService)
  {
    
    _CartService.cartCount.subscribe((data)=>{
    this.count = data
  })

  _WishlistService.wishListCount.subscribe((data)=>{
    this.WishCount = data
  })

  }

  signOut() {
    this._auth.signOut();
  }
  ngOnInit(): void {
    this._auth.userData.subscribe({
      next: (data) => {
        console.log(data);
        this.isLogin = this._auth.userData.getValue();
      },
    });

    
  }
}

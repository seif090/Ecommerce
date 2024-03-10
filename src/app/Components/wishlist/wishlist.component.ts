import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { Renderer2 } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { product } from './../../interfaces/products';
declare let Swal:any
declare let $:any

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  
  constructor(
    private _WishlistService:WishlistService,
    private _Renderer2:Renderer2,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    ){}
    
  productList: product[] = [];
  wishlistData:string[] =[];

  addToCart(id: string, element:HTMLButtonElement){
    this._Renderer2.setAttribute(element, 'disabled', 'true');
      this._CartService.addProductToCart(id).subscribe({
        next:(response)=>{
        console.log(response)
        if (response.status == 'success'){
          this._CartService.changeCartCount(response.numOfCartItems)
          Swal.fire({
            icon: 'success',
            title: 'Good Job!',
            text: response.message,
            timer: 2500
          })
          this._Renderer2.removeAttribute(element, 'disabled');
        }
        },
        error:(err)=>{
          this._Renderer2.removeAttribute(element, 'disabled');
        }
      })
    }
  
    checker : number = 0
  
    removeFav(prodId: string | undefined){
      this._WishlistService.removeWishListItem(prodId).subscribe({
        next:(response)=> {
          console.log(response);
          this._ToastrService.info(response.message);
          this.wishlistData = response.data;
          this.checker = response.data.length
          console.log(this.checker)
          // A solution to remove items from the wishlist screen
          // this._WishlistService.getWishList().subscribe({
          //   next:(response)=>{
          //     this.productList = response.data
          //   }
          // })

          // Another (A Better) solution to remove items from the wishlist screen
         const newProductsData = this.productList.filter((item:any)=> this.wishlistData.includes(item._id))
         this.productList = newProductsData; 
         this._WishlistService.wishListCount.next(response.data.length) 
        }
      })
    }

  ngOnInit(): void {
    $('.loading').fadeIn(0)
      this._WishlistService.getWishList().subscribe({
        next:(response)=>{
          console.log('Response Is: ', response);
          this.productList = response.data
          const newData = response.data.map((item:any)=> item._id);
          this.wishlistData = newData;
          this.checker = response.count
          console.log(this.checker)
          this._WishlistService.wishListCount.next(response.data.length) 
      },
      complete:()=>{
        $('.loading').fadeOut(1000)
      }
  })
}
}
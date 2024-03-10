import { Component, OnInit, Renderer2 } from '@angular/core';
import { product } from './../../interfaces/products';
import { ProductService } from 'src/app/Services/product.service';
import { Products } from 'src/app/interfaces/products';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
declare let Swal: any
declare let $:any 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productList: product[] = [];
  wishlistData:string[] =[];

  constructor(private _ProductService: ProductService, private _CartService: CartService, private _WishlistService:WishlistService, private _ToastrService:ToastrService, private _Renderer2:Renderer2) {}

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

  addFav(prodId:string | undefined): void{
    this._WishlistService.addToWishList(prodId).subscribe({
       next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message);
        this.wishlistData = response.data;
        this._WishlistService.wishListCount.next(response.data.length)
       }
    })
  }

  removeFav(prodId: string | undefined){
    this._WishlistService.removeWishListItem(prodId).subscribe({
      next:(response)=> {
        console.log(response);
        this._ToastrService.info(response.message);
        this.wishlistData = response.data;
        this._WishlistService.wishListCount.next(response.data.length)
      }
    })
  }

  ngOnInit(): void {
    $('.loading').fadeIn(0)
    this._ProductService. getSomeProducts().subscribe({
      next: (req: Products) => {
        console.log(req.data);
        this.productList = req.data;
      },
      complete:()=>{
        $('.loading').fadeOut(1000)
      }
    });
    this._WishlistService.getWishList().subscribe({
      next:(res)=>{
        const newData = res.data.map((item:any)=> item._id);
        this.wishlistData = newData;
        this._WishlistService.wishListCount.next(res.data.length)
      },
      complete:()=>{
        $('.loading').fadeOut(1000)
      }
    })
  }
}

import { ToastrService } from 'ngx-toastr';
import { product } from './../../interfaces/products';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { Products } from 'src/app/interfaces/products';
declare let $: any;
declare let Swal: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  wishlistData:string[] =[];

  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _WishlistService:WishlistService,
    private _ToastrService:ToastrService
  ) {}

  productList: product[] = [];
  searchVal: string = '';

  getAllData(page: string = '1') {
    $('.loading').fadeIn(0);
    this._ProductService.getAllProducts(page).subscribe({
      next: (req: Products) => {
        console.log(req.data);
        this.productList = req.data;
      },
      complete: () => {
        $('.loading').fadeOut(1000);
      },
    });
  }
  ngOnInit(): void {
    this.getAllData();
    $('.pagenum').click((e: any) => {
      let page = $(e.target).text();
      console.log(page);
      this.getAllData(page);
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

  addToCart(id: string) {
    this._CartService.addProductToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status == 'success') {
          this._CartService.changeCartCount(response.numOfCartItems);
          Swal.fire({
            icon: 'success',
            title: 'Good Job!',
            text: response.message,
            timer: 2500,
          });
        }
      },
    });
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
}

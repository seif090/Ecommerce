import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { Productdetails, productInfo } from 'src/app/interfaces/productdetails';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Services/cart.service';
declare let Swal: any;

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent {
  customOptions: OwlOptions = {
    loop: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 2000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };
  productDetail: productInfo | null = null;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) {
    _ActivatedRoute.params.subscribe((data) => {
      let id = data['id'];
      _productService.getDetails(id).subscribe({
        next: (data: Productdetails) => {
          this.productDetail = data.data;
        },
      });
    });
  }

  addToCart(id: string, element: HTMLButtonElement) {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addProductToCart(id).subscribe({
      next: (response) => {
        this._CartService.changeCartCount(response.numOfCartItems)
        console.log(response);
        if (response.status == 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Good Job!',
            text: response.message,
            timer: 2500,
          });
        }
        this._Renderer2.removeAttribute(element, 'disabled');
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element, 'disabled');
      }
    });
  }
}

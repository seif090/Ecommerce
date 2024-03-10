import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { CartData } from 'src/app/interfaces/cart';
declare let Swal: any;
declare let $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  updateQuantity(id: string, count: number) {
    if (count > 0) {
      this._CartService.updateCartQuantity(id, count).subscribe({
        next: (response: CartData) => {
          this.cartData = response;
          console.log(response);
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The Cart Quantity must be greater than 0!',
      });
    }
  }

  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (response) => {
        if (response.message == 'success') {
          this.cartData = null;
        }
        console.log(response);
        this._CartService.changeCartCount(response.numOfCartItems);
      },
    });
  }

  cartData: CartData | null = null;
  constructor(private _CartService: CartService) {}

  deleteProduct(id: string) {
    this._CartService.deleteProduct(id).subscribe({
      next: (response) => {
        this.cartData = response;
        console.log(response);
        this._CartService.changeCartCount(response.numOfCartItems);
        if (response.numOfCartItems == '0') {
          this.cartData = null;
        }
      },
    });
  }
  ngOnInit(): void {
    $('.loading').fadeIn(0);
    this._CartService.getAllProduct().subscribe({
      next: (response: CartData) => {
        this.cartData = response;
        console.log(response);
        this._CartService.changeCartCount(response.numOfCartItems);
      },
      complete: () => {
        $('.loading').fadeOut(1000);
      },
      error: (err) => {
        console.log('Error in getting data from server');
        $('.loading').fadeOut(1000);
      },
    });
  }
}

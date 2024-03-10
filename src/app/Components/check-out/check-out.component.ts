import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
ActivatedRoute

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {

  constructor(private _CartService: CartService, private _ActivatedRoute: ActivatedRoute){
    _ActivatedRoute.params.subscribe((data:any)=>{
      this.id = data.id
    })
  }

  shippingForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    phone: new FormControl (null, [Validators.required])
  })

  id:string = ''
  sendPaymentData(FormData: FormGroup){
    console.log(FormData.value);
    this._CartService.checkPayment(this.id, FormData.value).subscribe({
      next:(response)=>{
        window.location.href = response.session.url
        console.log(response.session.url);
      }
    })
  }

}

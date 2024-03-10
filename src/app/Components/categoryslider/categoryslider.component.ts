import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categoryslider',
  templateUrl: './categoryslider.component.html',
  styleUrls: ['./categoryslider.component.css']
})
export class CategorysliderComponent implements OnInit{

  customOptions: OwlOptions = {
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 1000,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
  }
  categorySlider: any[] = []
  constructor (private _ProductService: ProductService){}

  ngOnInit(): void {
      this._ProductService.getAllCategory().subscribe({
        next: (response)=>{
          console.log(response.data);
          this.categorySlider = response.data
        }
  })

}
}
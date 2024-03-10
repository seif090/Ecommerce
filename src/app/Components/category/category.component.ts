import { ProductService } from 'src/app/Services/product.service';
import { Component, OnInit } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})

export class CategoryComponent implements OnInit {
  constructor(private _ProductService: ProductService) {}

  categoryData: any[] = [];

  ngOnInit(): void {
    this._ProductService.getAllCategory().subscribe({
      next: (response) => {
        this.categoryData = response.data;
      },
    });
  }
}

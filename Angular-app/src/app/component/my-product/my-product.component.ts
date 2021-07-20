import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.css']
})
export class MyProductComponent implements OnInit {

  myproducts: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.loadMyProduct();
  }

  loadMyProduct() {
    this.productService.getMyProduct().subscribe(products => {
      this.myproducts = products
    })
    console.log(this.myproducts);
  }

  update() {
    this.loadMyProduct();
  }

}

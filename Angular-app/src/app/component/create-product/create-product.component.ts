import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ProductService} from "../../services/product.service";
import {ProductCategoryService} from "../../services/productCategory.service";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-creat-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreatProductComponent implements OnInit {

  productForm = this.fb.group({
    name: ["", [Validators.required]],
    description: ['', [Validators.required]],
    price: ["", [Validators.required]],
    category: ["", [Validators.required]],
    quantity: ["", [Validators.required]],
    negotiable: ["", [Validators.required]],
  })

  constructor(private authService : AuthService,
              private fb : FormBuilder,
              private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  get password() {
    return this.productForm.get('password');
  }

  onSubmit(): void{
    console.log(this.productForm.value);
    let product = (this.productForm.value as Product);
    product.selled = false;
    product.sended = false;
    console.log("(((((((((((((((((((((((((((");
    console.log(product);
    this.productService.createProduct(product).subscribe();

  }

}
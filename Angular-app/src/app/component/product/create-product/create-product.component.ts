import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product.model";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreatProductComponent implements OnInit {

  @Input() closeForm! : () => void;

  productForm = this.fb.group({
    name: ["", [Validators.required]],
    description: ['', [Validators.required]],
    price: ["", [Validators.required]],
    category: ["", [Validators.required]],
    quantity: ["", [Validators.required]],
    negotiable: ["", [Validators.required]],
  })

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private productService: ProductService) {
  }

  get password() {
    return this.productForm.get('password');
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.productForm.value);
    let product = (this.productForm.value as Product);
    product.selled = false;
    product.sended = false;
    console.log("(((((((((((((((((((((((((((");
    console.log(product);
    this.productService.createProduct(product).subscribe();

  }

  closeFormF(): void{
    this.closeForm();
  }

}

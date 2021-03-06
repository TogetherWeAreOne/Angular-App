import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product.model";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";
import {ProductCategoryService} from "../../../services/productCategory.service";
import {ProductCategory} from "../../../models/productCategory.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  @Input() closeForm! : () => void;
  @Input() product! : Product;
  productToUpdate! : Product ;
  productCategories! : ProductCategory[];
  selectedNegotiable!: string;
  selectedcCategory!: string;

  updateProductForm! : FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private productService: ProductService,
              private productCategoryService: ProductCategoryService,) {
  }


  ngOnInit(): void {
    this.productCategoryService.getAllProductCategory().subscribe(categories => this.productCategories = categories);
    this.productService.getProductById(this.product.id!).subscribe( result => {
      this.productToUpdate = result;
      this.selectedNegotiable = result.negotiable!;
      this.selectedcCategory = result.category!.name;
      console.log(this.selectedNegotiable);
      console.log(this.selectedcCategory);
    });
    this.updateProductForm = this.fb.group({
      name: [this.product.name, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      price: [this.product.price, [Validators.required]],
      category: [this.product.category, [Validators.required]],
      quantity: [this.product.quantity, [Validators.required]],
      negotiable: [this.product.negotiable, [Validators.required]],
    });

  }

  onSubmit(): void {
    let product = (this.updateProductForm.value as Product);
    this.productService.updateProduct(this.productToUpdate.id!, product).subscribe();

  }

  closeFormF(): void{
    this.closeForm();
  }



}

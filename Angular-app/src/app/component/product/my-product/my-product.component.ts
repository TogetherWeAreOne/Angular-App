import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product.model";
import {CreatProductComponent} from "../create-product/create-product.component";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UpdateProductComponent} from "../update-product/update-product.component";

@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.css']
})
export class MyProductComponent implements OnInit {

  displayCreateForm: boolean = false;
  displayUpdateForm: boolean = false;
  myproducts: Product[] = [];
  productFocus!: Product ;

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

  showCreateForm = () : void =>{
    this.displayCreateForm = true;
    console.log(this.displayCreateForm);
  }

  closeCreateForm = () : void => {
    this.displayCreateForm = false;
  }

  showUpdateForm(product: Product){
    console.log("--------------");
    console.log(product);
    console.log(product.category?.name);
    this.displayUpdateForm = true;
    this.productFocus = product;
  }

  closeUpdateForm = () : void => {
    this.displayUpdateForm = false;
  }
}

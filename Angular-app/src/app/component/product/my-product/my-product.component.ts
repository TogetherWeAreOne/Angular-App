import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product.model";


@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.css']
})
export class MyProductComponent implements OnInit {

  displayCreateForm: boolean = false;
  displayInfos: boolean = true;
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
    this.displayUpdateForm = true;
    this.productFocus = product;
  }

  closeUpdateForm = () : void => {
    this.displayUpdateForm = false;
  }

  showInfos(product: Product){
    this.displayInfos = true;
    this.productFocus = product;
  }

  closeInfos = () : void => {
    this.displayInfos = false;
  }
}

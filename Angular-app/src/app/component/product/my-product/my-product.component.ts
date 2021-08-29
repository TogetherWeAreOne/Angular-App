import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product.model";
import {FormBuilder, Validators} from "@angular/forms";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";
import {ProductCategory} from "../../../models/productCategory.model";
import {ProductCategoryService} from "../../../services/productCategory.service";
import {SearchProduct} from "../../../models/searchProduct.model";
import * as moment from "moment";
import {EventParticipant} from "../../../models/eventParticipant.model";


@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.css']
})
export class MyProductComponent implements OnInit {

  displayCreateForm: boolean = false;
  displayInfos: boolean = false;
  displayUpdateForm: boolean = false;
  myproducts: Product[] = [];
  myProductCopy : Product[] = [];
  productFocus!: Product ;
  productCategories! : ProductCategory[];

  searchProductForm = this.fb.group({
    name: ["", []],
    minPrice: ["", []],
    maxPrice: ["", []],
    category: [[], []],
    negotiable: ["", []]
  })

  constructor(private productService: ProductService,
              private fb: FormBuilder,
              private productCategoryService: ProductCategoryService) {
  }

  ngOnInit(): void {
    this.loadMyProduct();
    this.productCategoryService.getAllProductCategory().subscribe(categories => this.productCategories = categories);
  }

  searchProduct(){
    this.myproducts = this.myProductCopy;
    this.searchProductForm.value.name = this.searchProductForm.value.name === "" ? '.*' : this.searchProductForm.value.name + '*';
    this.searchProductForm.value.minPrice = this.searchProductForm.value.minPrice === "" ? 0 : this.searchProductForm.value.minPrice ;
    this.searchProductForm.value.maxPrice = this.searchProductForm.value.maxPrice === "" ? 99999999999999999 : this.searchProductForm.value.maxPrice ;
    this.searchProductForm.value.negotiable = this.searchProductForm.value.negotiable === "" ? '.*' : this.searchProductForm.value.negotiable;
    if( this.searchProductForm.value.category.length === 0){
      this.searchProductForm.value.category.push("");
    }
    console.log(this.searchProductForm.value);
    this.myproducts = this.myproducts.reduce( (productFiltered: Product[] , product) =>{
      if ( product.name!.match(this.searchProductForm.value.name)){
        if ( product.price! >= this.searchProductForm.value.minPrice && product.price! <= this.searchProductForm.value.maxPrice){
          if ( product.negotiable!.match(this.searchProductForm.value.negotiable)){
            for( let i = 0 ; i < this.searchProductForm.value.category.length; i ++){
              if ( product.category!.name.match(this.searchProductForm.value.category[i])){
                console.log("j'ai ajouté un produit")
                productFiltered.push(product);
              }
            }
          }
        }
      }
      return productFiltered;
    }, []);
    console.log(this.myproducts);
  }

  loadMyProduct() {
    this.productService.getMyProduct().subscribe(products => {
      this.myproducts = products
    }, ()=>{}, () => {
      for (let i = 0; i < this.myproducts.length; i++) {
        if (this.myproducts[i] === null) {
          this.myproducts.splice(i, 1);
        }
      }
      this.myProductCopy = this.myproducts;
    })
    console.log(this.myproducts);
  }

  deleteProduct(product : Product){
    confirm(" Voulez-vous vraiment supprimer ce produit ? ");
    this.productService.deleteProduct(product.id!).subscribe(() => {}, () => {},
      () => {
        for(let i = 0; i < this.myproducts.length; i++ ){
          if (this.myproducts[i] === product){
            this.myproducts.splice(i,1);
          }
        }
      })
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

  public updateProduct = (): void  =>  {
    console.log(" je suis rentré ! ");
    console.log(this.productFocus);
    this.productService.getProductById(this.productFocus.id!).subscribe(
      updatedProduct => this.productFocus = updatedProduct,
      () => {},
      () => {
        console.log("::::::::::");
        console.log(this.productFocus);
        for(let i = 0; i < this.myproducts.length; i++ ){
          if (this.myproducts[i].id === this.productFocus.id){
            this.myproducts[i] = this.productFocus;
          }
        }},
    )

  }
}

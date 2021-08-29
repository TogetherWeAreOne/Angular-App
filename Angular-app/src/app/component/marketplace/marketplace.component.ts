import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";
import {ProductCategory} from "../../models/productCategory.model";
import {ProductCategoryService} from "../../services/productCategory.service";
import {SearchProduct} from "../../models/searchProduct.model";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {

  products: Product[] = [];
  displayInfos: boolean = false;
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
              private productCategoryService: ProductCategoryService,
              private fb: FormBuilder,) {
  }

  ngOnInit(): void {
    this.load();
    this.productCategoryService.getAllProductCategory().subscribe(categories => this.productCategories = categories);
  }

  searchProduct(){
    if( this.searchProductForm.value.category.length === 0){
      this.searchProductForm.value.category.push("");
    }
    this.productService.searchProduct(this.searchProductForm.value as SearchProduct).subscribe(searchedProducts =>
      this.products = searchedProducts);
  }

  update() {
    this.load();
  }

  private load() {
    this.productService.getAllProduct().subscribe(p => this.products = p);
    console.log(this.products);
  }

  showInfos(product: Product){
    this.displayInfos = true;
    this.productFocus = product;
  }

  closeInfos = () : void => {
    this.displayInfos = false;
  }
}

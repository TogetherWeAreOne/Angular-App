import { Component, OnInit } from '@angular/core';
import {Product} from "../../../models/product.model";
import {ProductService} from "../../../services/product.service";
import {ProductCategoryService} from "../../../services/productCategory.service";
import {FormBuilder} from "@angular/forms";
import {SearchProduct} from "../../../models/searchProduct.model";
import {AuctionSale} from "../../../models/auctionSale.model";
import {AuctionSaleCategory} from "../../../models/auctionSaleCategory.model";
import {AuctionSaleService} from "../../../services/auctionSale.service";
import {AuctionSaleCategoryService} from "../../../services/auctionSaleCategory.service";

@Component({
  selector: 'app-auction-list-page',
  templateUrl: './auction-list-page.component.html',
  styleUrls: ['./auction-list-page.component.css']
})
export class AuctionListPageComponent implements OnInit {

  auctions: AuctionSale[] = [];
  displayInfos: boolean = false;
  auctionFocus!: AuctionSale ;
  auctionCategories! : AuctionSaleCategory[];

  searchProductForm = this.fb.group({
    name: ["", []],
    minPrice: ["", []],
    maxPrice: ["", []],
    category: [[], []],
    negotiable: ["", []]
  })

  constructor(private auctionSaleService: AuctionSaleService,
              private auctionSaleCategoryService: AuctionSaleCategoryService,
              private fb: FormBuilder,) {
  }

  ngOnInit(): void {
    this.load();
    this.auctionSaleCategoryService.getAllAuctionSaleCategory().subscribe(categories => this.auctionCategories = categories);
  }

  /*searchProduct(){
    if( this.searchProductForm.value.category.length === 0){
      this.searchProductForm.value.category.push("");
    }
    this.productService.searchProduct(this.searchProductForm.value as SearchProduct).subscribe(searchedProducts =>
      this.products = searchedProducts);
  } */

  update() {
    this.load();
  }

  private load() {
    this.auctionSaleService.getAllAuctionSale().subscribe(p => this.auctions = p);
    console.log(this.auctions);
  }

  showInfos(auction: AuctionSale){
    this.displayInfos = true;
    this.auctionFocus = auction;
  }

  closeInfos = () : void => {
    this.displayInfos = false;
  }
}

import { Component, OnInit } from '@angular/core';
import {Product} from "../../../models/product.model";
import {ProductCategory} from "../../../models/productCategory.model";
import {ProductService} from "../../../services/product.service";
import {FormBuilder} from "@angular/forms";
import {ProductCategoryService} from "../../../services/productCategory.service";
import {AuctionSale} from "../../../models/auctionSale.model";
import {AuctionSaleCategory} from "../../../models/auctionSaleCategory.model";
import {AuctionSaleService} from "../../../services/auctionSale.service";
import {AuctionSaleCategoryService} from "../../../services/auctionSaleCategory.service";

@Component({
  selector: 'app-my-auction',
  templateUrl: './my-auction.component.html',
  styleUrls: ['./my-auction.component.css']
})
export class MyAuctionComponent implements OnInit {

  displayCreateForm: boolean = false;
  displayInfos: boolean = false;
  displayUpdateForm: boolean = false;
  myAuctions: AuctionSale[] = [];
  myAuctionsCopy : AuctionSale[] = [];
  auctionFocus!: AuctionSale ;
  auctionSaleCategories! : AuctionSaleCategory[];

  searchProductForm = this.fb.group({
    name: ["", []],
    minPrice: ["", []],
    maxPrice: ["", []],
    category: [[], []],
    negotiable: ["", []]
  })

  constructor(private auctionSaleService: AuctionSaleService,
              private fb: FormBuilder,
              private auctionSaleCategoryService: AuctionSaleCategoryService) {
  }

  ngOnInit(): void {
    this.loadMyAuctions();
    this.auctionSaleCategoryService.getAllAuctionSaleCategory().subscribe(categories => this.auctionSaleCategories = categories);
  }

  /*searchProduct(){
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
  }*/

  loadMyAuctions() {
    this.auctionSaleService.getMyAuctionSale().subscribe(auctions => {
      this.myAuctions = auctions
    }, (err)=>{
      console.log(err )}, () => {
      for (let i = 0; i < this.myAuctions.length; i++) {
        if (this.myAuctions[i] === null) {
          this.myAuctions.splice(i, 1);
        }
      }
      this.myAuctionsCopy = this.myAuctions;
    })
    console.log(this.myAuctions);
  }

  deleteProduct(auction : AuctionSale){
    confirm(" Voulez-vous vraiment supprimer ce produit ? ");
    this.auctionSaleService.deleteAuctionSale(auction.id!).subscribe(() => {}, () => {},
      () => {
        for(let i = 0; i < this.myAuctions.length; i++ ){
          if (this.myAuctions[i] === auction){
            this.myAuctions.splice(i,1);
          }
        }
      })
  }

  update() {
    this.loadMyAuctions();
  }

  showCreateForm = () : void =>{
    this.displayCreateForm = true;
    console.log(this.displayCreateForm);
  }

  closeCreateForm = () : void => {
    this.displayCreateForm = false;
  }

  showUpdateForm(auction : AuctionSale){
    this.displayUpdateForm = true;
    this.auctionFocus = auction;
  }

  closeUpdateForm = () : void => {
    this.displayUpdateForm = false;
  }

  showInfos(auction : AuctionSale){
    this.displayInfos = true;
    this.auctionFocus = auction;
  }

  closeInfos = () : void => {
    this.displayInfos = false;
  }

  public updateProduct = (): void  =>  {
    console.log(" je suis rentré ! ");
    console.log(this.auctionFocus);
    this.auctionSaleService.getAuctionSaleById(this.auctionFocus.id!).subscribe(
      updatedAuction => this.auctionFocus = updatedAuction,
      () => {},
      () => {
        console.log("::::::::::");
        console.log(this.auctionFocus);
        for(let i = 0; i < this.myAuctions.length; i++ ){
          if (this.myAuctions[i].id === this.auctionFocus.id){
            this.myAuctions[i] = this.auctionFocus;
          }
        }},
    )

  }

}

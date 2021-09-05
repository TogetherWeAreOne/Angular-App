import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product.model";
import {AuctionSaleService} from "../../../services/auctionSale.service";
import {AuctionSale} from "../../../models/auctionSale.model";
import {AuctionSaleCategoryService} from "../../../services/auctionSaleCategory.service";
import {AuctionSaleCategory} from "../../../models/auctionSaleCategory.model";

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent implements OnInit {

  @Input() closeForm! : () => void;
  images!: File[];
  auctionSaleCategories! : AuctionSaleCategory[];

  auctionSaleForm = this.fb.group({
    name: ["", [Validators.required]],
    description: ["", [Validators.required]],
    startPrice: ["", [Validators.required]],
    endDate: ["", [Validators.required]],
    category: ["", [Validators.required]],
    imagesAuctionSale: [[], []]
  })

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private auctionSaleService: AuctionSaleService,
              private auctionSaleCategoryService: AuctionSaleCategoryService) {
  }

  ngOnInit(): void {
    this.auctionSaleCategoryService.getAllAuctionSaleCategory().subscribe(categories => this.auctionSaleCategories = categories);
  }

  onSubmit(): void {
    let auctionSale = (this.auctionSaleForm.value as AuctionSale);
    auctionSale.selled = false;
    auctionSale.sended = false;
    this.auctionSaleService.createAuctionSale(auctionSale, this.images).subscribe();
    this.auctionSaleForm.reset();
  }

  selectImages(event: any) {
    if(event.target.files.length > 0){
      this.images = event.target.files;
    }
    console.log(this.images);
  }

  closeFormF(): void {
    this.closeForm();
  }
}

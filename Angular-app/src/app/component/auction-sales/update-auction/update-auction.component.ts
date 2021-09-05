import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../models/event.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {EventService} from "../../../services/event.service";
import {AuctionSale} from "../../../models/auctionSale.model";
import {AuctionSaleService} from "../../../services/auctionSale.service";
import {AuctionSaleCategoryService} from "../../../services/auctionSaleCategory.service";
import {AuctionSaleCategory} from "../../../models/auctionSaleCategory.model";

@Component({
  selector: 'app-update-auction',
  templateUrl: './update-auction.component.html',
  styleUrls: ['./update-auction.component.css']
})
export class UpdateAuctionComponent implements OnInit {

  @Input() closeForm! : () => void;
  @Input() auction! : AuctionSale;
  auctionToUpdate! : AuctionSale ;
  selectedCategory!: string;
  auctionSaleCategories! : AuctionSaleCategory[];

  updateAuctionForm! : FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private auctionService: AuctionSaleService,
              private auctionSaleCategoryService: AuctionSaleCategoryService) {
  }

  ngOnInit(): void {
    console.log("/////////////////////")
    this.auctionSaleCategoryService.getAllAuctionSaleCategory().subscribe(categories => this.auctionSaleCategories = categories);
    this.auctionService.getAuctionSaleById(this.auction.id!).subscribe( result => {this.auctionToUpdate = result;
      this.selectedCategory = result.category!.name!});

    this.updateAuctionForm = this.fb.group({
      name: [this.auction.name, [Validators.required]],
      description: [this.auction.description, [Validators.required]],
      category: [this.auction.category, [Validators.required]],
    });

  }

  onSubmit(): void {
    console.log("++++++++++++++++++++++++++++");
    console.log(this.updateAuctionForm.value);
    let auction = (this.updateAuctionForm.value as AuctionSale);
    this.auctionService.updateAuctionSale(this.auctionToUpdate.id!, auction).subscribe();

  }

  closeFormF(): void{
    this.closeForm();
  }

}

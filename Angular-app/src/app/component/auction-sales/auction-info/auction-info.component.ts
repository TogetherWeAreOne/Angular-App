import {Component, Inject, Input, OnInit} from '@angular/core';
import {Product} from "../../../models/product.model";
import {ProductProposal} from "../../../models/productProposal.model";
import {ProductImage} from "../../../models/productImage.model";
import {FormBuilder, Validators} from "@angular/forms";
import {ProductProposalService} from "../../../services/productProposal.service";
import {AuthService} from "../../../services/auth.service";
import {ProductService} from "../../../services/product.service";
import {ProductImageService} from "../../../services/productImage.service";
import {DomSanitizer} from "@angular/platform-browser";
import {AuctionSale} from "../../../models/auctionSale.model";
import {AuctionSaleService} from "../../../services/auctionSale.service";
import {AuctionSaleProposalService} from "../../../services/auctionSaleProposal.service";
import {AuctionSaleProposal} from "../../../models/auctionSaleProposal.model";
import {AuctionImageService} from "../../../services/auctionSaleImage.service";
import {PageEvent} from '@angular/material/paginator';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {AuctionSaleImage} from "../../../models/auctionSaleImage.model";

@Component({
  selector: 'app-auction-info',
  templateUrl: './auction-info.component.html',
  styleUrls: ['./auction-info.component.css']
})
export class AuctionInfoComponent implements OnInit {

  @Input() closeInfos = () => {};
  @Input() auction! : AuctionSale;
  @Input() updateProduct! : () => void;
  displayInfos : boolean = true;
  displayProposal : boolean = false;
  auctionProposals : AuctionSaleProposal[] = [];
  auctionImages : AuctionSaleImage[] = [];
  activeImage : number = 1;

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  proposalForm = this.fb.group({
    price: ["", [Validators.required]]
  })

  constructor(private auctionSaleProposalService: AuctionSaleProposalService,
              public authService : AuthService,
              private fb: FormBuilder,
              private auctionSaleService: AuctionSaleService,
              private auctionImageService: AuctionImageService,
              private sanitizer:DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.auctionImageService.getAllImageByAuction(this.auction).subscribe(
      images => this.auctionImages = images,
      (err) => {
        console.log(err)},
      () => { }
    );

  }

  loadProposal() {
    this.auctionSaleProposalService.getAllAuctionSaleProposallOfAuction(this.auction.id!).subscribe(
      value => this.auctionProposals = value
    )
  }

  showInfos(){
    this.displayInfos = true;
    this.displayProposal = false;
  }

  showProposals(){
    console.log(this.auction)
    this.loadProposal();
    this.displayInfos = false;
    this.displayProposal = true;
  }

  displayProposalForm() {
    let form = document.getElementById('proposal-interface');
    form!.style.display = 'block';
  }

  closeProposalForm() {
    let form = document.getElementById('proposal-interface');
    form!.style.display = 'none';
  }

  makeProposal(auction : AuctionSale){
    this.auctionSaleProposalService.createAuctionSaleProposal(auction.id!, this.proposalForm.value as ProductProposal).subscribe(
      () => {},
      error => {alert(error.error)},
      () => {alert("Votre proposition d'achat à bien été pris en compte");
        this.closeProposalForm();}
    );
  }
  changeActiveImage(n : number) {
    this.showImages(n);
  }

  showImages(n : number) {
    this.activeImage = this.activeImage + n;
    console.log(this.activeImage);
    let slides = < HTMLCollectionOf<HTMLElement> > document.getElementsByClassName('image-container');
    for (let j = 0; j < slides.length; j++){
      slides[j] = slides[j] as HTMLElement;
    }
    console.log(slides);
    if (this.activeImage > slides.length) {this.activeImage = 1}
    if (this.activeImage < 1) {this.activeImage = slides.length}
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    console.log('////////////');
    console.log(this.activeImage-1);
    console.log(slides[this.activeImage-1] as HTMLElement);
    console.log(slides.item(this.activeImage-1) as HTMLElement);
    slides.item(this.activeImage-1)!.style.display = "block";
  }

}



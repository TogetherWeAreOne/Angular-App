import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../models/product.model";
import {ProductProposal} from "../../../models/productProposal.model";
import {ProductProposalService} from "../../../services/productProposal.service";
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {ProductImage} from "../../../models/productImage.model";
import {ProductImageService} from "../../../services/productImage.service";
import {DomSanitizer} from '@angular/platform-browser';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.css']
})
export class InfoProductComponent implements OnInit {

  @Input() closeInfos = () => {};
  @Input() product! : Product;
  @Input() updateProduct! : () => void;
  displayInfos : boolean = true;
  displayProposal : boolean = false;
  productProposals : ProductProposal[] = [];
  productImages : ProductImage[] = [];
  pageEvent!: PageEvent;
  length = 100;
  startPaginaor : boolean = true;
  pageSize = 1;

  proposalForm = this.fb.group({
    price: ["", [Validators.required]],
    message: ["", []],
  })

  constructor(private productProposalService: ProductProposalService,
              public authService : AuthService,
              private fb: FormBuilder,
              private productService: ProductService,
              private productImageService: ProductImageService,
              private sanitizer:DomSanitizer) { }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit(): void {
    this.productImageService.getAllImageByProduct(this.product).subscribe(
      images => this.productImages = images,
      (err) => {
        console.log(err)},
      () => { this.length = this.productImages.length }
    )
  }

  loadProposal() {
    this.productProposalService.getAllProductProposalOfProduct(this.product.id!).subscribe(
      value => this.productProposals = value
    )
  }

  showInfos(){
    this.displayInfos = true;
    this.displayProposal = false;
  }

  showProposals(){
    console.log(this.product)
    this.loadProposal();
    this.displayInfos = false;
    this.displayProposal = true;
  }

  refuseProposal(proposal : ProductProposal){
    console.log( "ici :" + proposal.product?.id);
    this.productProposalService.refuseProductProposal(proposal).subscribe();
  }

  confirmProposal(proposal : ProductProposal){
    this.productProposalService.confirmProductProposal(proposal).subscribe(
      () => {},
      () => alert("une erreur est survenue"),
      () => { alert("la proposition à bien été acceptée");
        for(let i = 0; i < this.productProposals.length; i++ ){
          if (this.productProposals[i] === proposal){
            this.productProposals.splice(i,1);
            this.updateProduct();
          }
        }
      }
    );
  }

  displayProposalForm() {
    let form = document.getElementById('proposal-interface');
    form!.style.display = 'block';
  }

  closeProposalForm() {
    let form = document.getElementById('proposal-interface');
    form!.style.display = 'none';
  }

  makeProposal(product : Product){
    this.proposalForm.value;
    this.productProposalService.createProductProposal(product.id!, this.proposalForm.value as ProductProposal).subscribe(
      () => {},
      error => {alert(error.error)},
      () => {alert("Votre proposition d'achat à bien été envoyée");
        this.closeProposalForm();}
    );
  }

  buyProduct(product: Product){
    this.productService.buyProduct(product.id!).subscribe();
  }

  test() : void {
    alert("coucou");
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../models/product.model";
import {ProductProposal} from "../../../models/productProposal.model";
import {ProductProposalService} from "../../../services/productProposal.service";

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.css']
})
export class InfoProductComponent implements OnInit {

  @Input() closeInfos = () => {};
  @Input() product! : Product;
  displayInfos : boolean = true;
  displayProposal : boolean = false;
  productProposals : ProductProposal[] = [];

  constructor(private productProposalService: ProductProposalService) { }

  ngOnInit(): void {
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
    this.productProposalService.confirmProductProposal(proposal).subscribe();
  }


  test() : void {
    alert("coucou");
  }
}

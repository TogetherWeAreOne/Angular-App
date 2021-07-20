import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.load();
  }

  update() {
    this.load();
  }

  private load() {
    this.productService.getMyProduct().subscribe(p => this.products = p);
    console.log(this.products);
  }
}

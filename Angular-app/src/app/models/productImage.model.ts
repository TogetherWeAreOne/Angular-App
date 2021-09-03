import {Product} from "./product.model";

export class ProductImage {
  url?: string;
  product? : Product;


  constructor(url: string, product: Product) {
    this.url = url;
    this.product = product;
  }
}

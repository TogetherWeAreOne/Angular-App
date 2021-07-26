import {Product} from "./product.model";
import {User} from "./user.model";

export class ProductProposal {
  user?: User;
  product?: Product;
  price: number;
  message?: string;
  state?: string;


  constructor(user: User, product: Product, price: number, message: string, state: string) {
    this.user = user;
    this.product = product;
    this.price = price;
    this.message = message;
    this.state = state;
  }
}

import {User} from "./user.model";
import {ProductCategory} from "./productCategory.model";

export class Product {
  id?: string;
  name: string;
  description?: string;
  price?: number;
  quantity?: number;
  negotiable?: string;
  state?: string;
  sended?: boolean;
  selled?: boolean;
  creator?: User;
  category?: ProductCategory;


  constructor(name: string, description: string, price: number, quantity: number, negotiable: string, state: string, sended: boolean, selled: boolean, creator: User, category: ProductCategory) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.negotiable = negotiable;
    this.state = state;
    this.sended = sended;
    this.selled = selled;
    this.creator = creator;
    this.category = category;
  }


}

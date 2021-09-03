import {User} from "./user.model";
import {AuctionSale} from "./auctionSale.model";

export class AuctionSaleProposal {
  user?: User;
  auctionSale?: AuctionSale;
  price?: number;
  state?: string;


  constructor(user: User, auctionSale: AuctionSale, price: number, state: string) {
    this.user = user;
    this.auctionSale = auctionSale;
    this.price = price;
    this.state = state;
  }
}

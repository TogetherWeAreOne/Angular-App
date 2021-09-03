import {User} from "./user.model";
import {AuctionSaleCategory} from "./auctionSaleCategory.model";

export class AuctionSale {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  startPrice?: number;
  actualPrice?: number;
  endDate?: string;
  state?: string;
  sended?: boolean;
  selled?: boolean;
  sendedDate?: string;
  creator?: User;
  owner?: User
  category?: AuctionSaleCategory;


  constructor(id: string, name: string, description: string, image: string, startPrice: number, actualPrice: number, endDate: string, state: string, sended: boolean, selled: boolean, sendedDate: string, creator: User, owner: User, category: AuctionSaleCategory) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.startPrice = startPrice;
    this.actualPrice = actualPrice;
    this.endDate = endDate;
    this.state = state;
    this.sended = sended;
    this.selled = selled;
    this.sendedDate = sendedDate;
    this.creator = creator;
    this.owner = owner;
    this.category = category;
  }
}

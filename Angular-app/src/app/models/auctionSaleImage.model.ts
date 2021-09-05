import {AuctionSale} from "./auctionSale.model";

export class AuctionSaleImage {
  id?: string
  url?: string;
  auctionSale? : AuctionSale;

  constructor(id: string, url: string, auctionSale: AuctionSale) {
    this.id = id;
    this.url = url;
    this.auctionSale = auctionSale;
  }
}

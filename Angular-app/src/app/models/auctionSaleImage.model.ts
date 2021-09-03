import {AuctionSale} from "./auctionSale.model";

export class AuctionSaleImage {
  url?: string;
  auctionSale? : AuctionSale;

  constructor(url: string, auctionSale: AuctionSale) {
    this.url = url;
    this.auctionSale = auctionSale;
  }
}

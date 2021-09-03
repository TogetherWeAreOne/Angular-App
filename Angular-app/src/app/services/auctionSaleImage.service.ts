import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../models/product.model";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {ProductCategory} from "../models/productCategory.model";
import {ProductImage} from "../models/productImage.model";
import {AuctionSale} from "../models/auctionSale.model";
import {AuctionSaleImage} from "../models/auctionSaleImage.model";

@Injectable({providedIn: 'root'})
export class AuctionImageService {

  constructor(private cookieService: CookieService, private http: HttpClient) {
  }

  public getAllImageByAuction(auction : AuctionSale) : Observable<AuctionSaleImage[]>{
    console.log(auction.id);
    return this.http.get<ProductImage[]>(`${environment.apiBaseUrl}/product/${auction.id}/getImages`) ;
  }

}

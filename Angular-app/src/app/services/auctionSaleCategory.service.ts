import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductCategory} from "../models/productCategory.model";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuctionSaleCategory} from "../models/auctionSaleCategory.model";

@Injectable({providedIn: 'root'})
export class AuctionSaleCategoryService {

  public auctionSaleCategory: Observable<AuctionSaleCategory[]>;
  private auctionSaleCategorySubject: BehaviorSubject<AuctionSaleCategory[]>;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.auctionSaleCategorySubject = new BehaviorSubject<AuctionSaleCategory[]>([{}]);
    this.auctionSaleCategory = this.auctionSaleCategorySubject.asObservable();
  }

  public getAllAuctionSaleCategory() : Observable<AuctionSaleCategory[]>{
    return this.http.get<AuctionSaleCategory[]>(`${environment.apiBaseUrl}/productCategory/getAll`) ;
  }

}

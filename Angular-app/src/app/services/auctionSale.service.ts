import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../models/product.model";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {SearchProduct} from "../models/searchProduct.model";
import {AuctionSale} from "../models/auctionSale.model";

@Injectable({providedIn: 'root'})
export class AuctionSaleService {

  public auctionSale: Observable<AuctionSale[]>;
  private auctionSaleSubject: BehaviorSubject<AuctionSale[]>;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.auctionSaleSubject = new BehaviorSubject<AuctionSale[]>([{}]);
    this.auctionSale = this.auctionSaleSubject.asObservable();

  }

  public createAuctionSale(auctionSale: AuctionSale, files: File[]): Observable<AuctionSale> {
    const formData = new FormData();
    formData.append("auctionSale", JSON.stringify(auctionSale));
    if (files) {
      for (let file of files) {
        formData.append("imagesAuction", file);
      }
    }
    return this.http.post<AuctionSale>(`${environment.apiBaseUrl}/auctionSale/create`, formData)
      .pipe(map(product => {
        return product;
      }));
  }

  public getMyAuctionSale(): Observable<AuctionSale[]> {
    return this.http.get<AuctionSale[]>(`${environment.apiBaseUrl}/auctionSale/getAllMyAuctionSales`);
  }

  public getAllAuctionSale(): Observable<AuctionSale[]> {
    return this.http.get<AuctionSale[]>(`${environment.apiBaseUrl}/auctionSale/getAll`);
  }

  public deleteAuctionSale(auctionSaleId : string): Observable<AuctionSale> {
    return this.http.delete<AuctionSale>(`${environment.apiBaseUrl}/auctionSale/${auctionSaleId}/delete`);
  }

  public updateAuctionSale(auctionSaleId: string, auctionSale: AuctionSale): Observable<AuctionSale>{
    console.log(auctionSale);
    console.log("/////////////");
    console.log(auctionSale);
    return this.http.put<Product>(`${environment.apiBaseUrl}/auctionSale/${auctionSaleId}/update`, auctionSale);
  }

  public getAuctionSaleById(auctionSaleId : string): Observable<AuctionSale> {
    return this.http.get<Product>(`${environment.apiBaseUrl}/auctionSale/${auctionSaleId}/get`);
  }

  public buyAuctionSale(auctionSaleId : string): Observable<AuctionSale> {
    return this.http.get<AuctionSale>(`${environment.apiBaseUrl}/auctionSale/${auctionSaleId}/buy`);
  }

  public searchAuctionSale(search: SearchProduct): Observable<AuctionSale[]> {
    return this.http.post<AuctionSale[]>(`${environment.apiBaseUrl}/auctionSale/getBySearch`, search);
  }
}

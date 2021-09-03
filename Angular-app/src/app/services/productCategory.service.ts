import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../models/product.model";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {ProductCategory} from "../models/productCategory.model";

@Injectable({providedIn: 'root'})
export class ProductCategoryService {

  public productCategory: Observable<ProductCategory[]>;
  private productCategorySubject: BehaviorSubject<ProductCategory[]>;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.productCategorySubject = new BehaviorSubject<ProductCategory[]>([{name: "none"}]);
    this.productCategory = this.productCategorySubject.asObservable();
  }


  public getAllProductCategory() : Observable<ProductCategory[]>{
    return this.http.get<ProductCategory[]>(`${environment.apiBaseUrl}/productCategory/getAll`) ;
  }



  public getProductCategoryByName(name: string): Observable<ProductCategory> {
    return this.http.get<ProductCategory>(`${environment.apiBaseUrl}/productCategory/${name}/getByName`);
  }

}

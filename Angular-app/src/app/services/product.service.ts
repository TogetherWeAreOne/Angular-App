import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Product} from "../models/product.model";

@Injectable({providedIn: 'root'})
export class ProductService {

  public product: Observable<Product[]>;
  private productSubject: BehaviorSubject<Product[]>;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.productSubject = new BehaviorSubject<Product[]>([{name: "none"}]);
    this.product = this.productSubject.asObservable();
  }

  public createProduct(product: Product): Observable<Product> {
    console.log("......................");
    console.log(product);
    return this.http.post<Product>(`${environment.apiBaseUrl}/product/create`, product)
      .pipe(map(event => {
        console.log("......." + event);
        return event;
      }));
  }

  public getMyProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/product/getAllMyProduct`);
  }

}

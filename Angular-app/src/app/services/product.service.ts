import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Product} from "../models/product.model";

@Injectable({providedIn: 'root'})
export class ProductService {

  public products: Observable<Product[]>;
  private productsSubject: BehaviorSubject<Product[]>;

  public product: Observable<Product>;
  private productSubject: BehaviorSubject<Product>;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.productsSubject = new BehaviorSubject<Product[]>([{name: "none"}]);
    this.products = this.productsSubject.asObservable();

    this.productSubject = new BehaviorSubject<Product>({name: "none"});
    this.product = this.productSubject.asObservable();
  }

  public createProduct(product: Product): Observable<Product> {
    console.log("......................");
    console.log(product);
    return this.http.post<Product>(`${environment.apiBaseUrl}/product/create`, product)
      .pipe(map(product => {
        return product;
      }));
  }

  public getMyProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/product/getAllMyProduct`);
  }

  public updateProduct(productId: string, product: Product): Observable<Product>{
    console.log(product);
    console.log("/////////////");
    console.log(productId);
    return this.http.put<Product>(`${environment.apiBaseUrl}/product/${productId}/update`, product);
  }

  public getProductById(productId : string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiBaseUrl}/product/${productId}/get`)
      .pipe(map(product => {
      this.productSubject.next(product);
      return product as Product;
    }));
  }

}

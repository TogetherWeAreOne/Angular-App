import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../models/product.model";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {ProductCategory} from "../models/productCategory.model";
import {ProductImage} from "../models/productImage.model";

@Injectable({providedIn: 'root'})
export class ProductImageService {

  public productImage: Observable<ProductImage[]>;
  private productImageSubject: BehaviorSubject<ProductImage[]>;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.productImageSubject = new BehaviorSubject<ProductImage[]>([{}]);
    this.productImage = this.productImageSubject.asObservable();
  }

  public getAllImageByProduct(product : Product) : Observable<ProductImage[]>{
    console.log(product.id);
    console.log("///////////////");
    return this.http.get<ProductImage[]>(`${environment.apiBaseUrl}/product/${product.id}/getImages`) ;
  }

}

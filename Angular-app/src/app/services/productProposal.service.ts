import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductCategory} from "../models/productCategory.model";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product.model";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {ProductProposal} from "../models/productProposal.model";

@Injectable({providedIn: 'root'})
export class ProductProposalService {

  public productProposal: Observable<ProductProposal[]>;
  private productProposalSubject: BehaviorSubject<ProductProposal[]>;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.productProposalSubject = new BehaviorSubject<ProductProposal[]>([{price: 0}]);
    this.productProposal = this.productProposalSubject.asObservable();
  }

  /*public createProduct(product: ProductProposal): Observable<ProductProposal> {
    console.log("icicicicicicici");
    return this.http.post<Product>(`${environment.apiBaseUrl}/product/create`, product)
      .pipe(map(event => {
        console.log("......." + event);
        return event;
      }));
  }*/

  public getAllProductProposalOfProduct(productId: string) : Observable<ProductProposal[]>{
    return this.http.get<ProductProposal[]>(`${environment.apiBaseUrl}/product/proposal/${productId}/getAllProposal`) ;
  }

  public createProductProposal(productId: string, proposal: ProductProposal): Observable<ProductProposal>{
    return this.http.post<ProductProposal>(`${environment.apiBaseUrl}/product/proposal/${productId}/create`, proposal) ;
  }

  public refuseProductProposal(proposal: ProductProposal) : Observable<ProductProposal>{
    return this.http.put<ProductProposal>(`${environment.apiBaseUrl}/product/proposal/${proposal.product?.id}/${proposal.user?.id}/refused`, proposal) ;
  }

  public confirmProductProposal(proposal: ProductProposal) : Observable<ProductProposal>{
    return this.http.put<ProductProposal>(`${environment.apiBaseUrl}/product/proposal/${proposal.product?.id}/${proposal.user?.id}/confirm`, proposal) ;
  }
}

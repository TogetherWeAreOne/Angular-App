import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductProposal} from "../models/productProposal.model";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuctionSaleProposal} from "../models/auctionSaleProposal.model";

@Injectable({providedIn: 'root'})
export class AuctionSaleProposalService {

  public auctionSaleProposal: Observable<AuctionSaleProposal[]>;
  private auctionSaleProposalSubject: BehaviorSubject<AuctionSaleProposal[]>;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.auctionSaleProposalSubject = new BehaviorSubject<AuctionSaleProposal[]>([{}]);
    this.auctionSaleProposal = this.auctionSaleProposalSubject.asObservable();
  }


  public getAllAuctionSaleProposallOfAuction(auctionSaleId: string) : Observable<AuctionSaleProposal[]>{
    return this.http.get<AuctionSaleProposal[]>(`${environment.apiBaseUrl}/auctionSale/proposal/${auctionSaleId}/getAllProposal`) ;
  }

  public createAuctionSaleProposal(auctionSaleId: string, proposal: any): Observable<AuctionSaleProposal>{
    return this.http.post<AuctionSaleProposal>(`${environment.apiBaseUrl}/auctionSale/proposal/${auctionSaleId}/create`, proposal) ;
  }

  public confirmAuctionSaleProposal(proposal: AuctionSaleProposal) : Observable<AuctionSaleProposal>{
    return this.http.put<AuctionSaleProposal>(`${environment.apiBaseUrl}/product/proposal/${proposal.auctionSale?.id}/${proposal.user?.id}/confirm`, proposal) ;
  }
}

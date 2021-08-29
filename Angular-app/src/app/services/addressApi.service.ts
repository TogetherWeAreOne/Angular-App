import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";


@Injectable({providedIn: 'root'})
export class AddressApiService {

  public address: Observable<any>;
  private addressSubject: BehaviorSubject<any>;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.addressSubject = new BehaviorSubject<any>({});
    this.address = this.addressSubject.asObservable();
  }

  public getAddress(address: string): Observable<any> {
    return this.http.get<any>(`https://api-adresse.data.gouv.fr/search/?q=${address}&limit=5`)
  }
}

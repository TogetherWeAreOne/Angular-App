import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Event} from "../models/event.model";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Product} from "../models/product.model";

@Injectable( { providedIn : 'root'})
export class EventService {

  public product: Observable<Product>;
  private productSubject: BehaviorSubject<Product>;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.productSubject = new BehaviorSubject<Product>({name: "none"});
    this.product = this.productSubject.asObservable();
  }

  public createProduct(title: string, description: string, maxParticipant: number, minParticipant: number, image: string, address: string, zip: string, country: string, startDate: string, endDate: string, eventType: string): Observable<Event> {
    console.log("icicicicicicici");
    return this.http.post<Event>(`${environment.apiBaseUrl}/event/create`, {
      title,
      description,
      maxParticipant,
      minParticipant,
      image,
      address,
      zip,
      country,
      startDate,
      endDate,
      eventType
    })
      .pipe(map(event => {
        console.log("......." + event);
        return event;
      }));
  }

}

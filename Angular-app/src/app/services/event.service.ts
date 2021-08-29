import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Event} from "../models/event.model";
import {Product} from "../models/product.model";
import {SearchProduct} from "../models/searchProduct.model";
import {SearchEvent} from "../models/searchEvent.model";

@Injectable({providedIn: 'root'})
export class EventService {

  public event: Observable<Event>;
  private eventSubject: BehaviorSubject<Event>;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.eventSubject = new BehaviorSubject<Event>({title: "none"});
    this.event = this.eventSubject.asObservable();
  }

//  title: string, description: string, maxParticipant: number, minParticipant: number,image: string, address: string, zip: string, country: string, startDate: string, endDate: string, eventType: string
  public createEvent(event: Event): Observable<Event> {
    console.log("icicicicicicici");
    return this.http.post<Event>(`${environment.apiBaseUrl}/event/create`, event)
      .pipe(map(event => {
        console.log("......." + event);
        return event;
      }));
  }

  public getAllEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/getAllEvent`);
  }

  public getEventById(eventId : string): Observable<Event> {
    return this.http.get<Event>(`${environment.apiBaseUrl}/event/${eventId}/get`);
  }

  public getMyEvents() : Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/getAllMyEvent`);
  }

  public updateEvent(eventId: string, event: Event): Observable<Event>{
    console.log(event);
    console.log("/////////////");
    console.log(eventId);
    return this.http.put<Event>(`${environment.apiBaseUrl}/event/${eventId}/update`, event);
  }

  public searchEvent(search: SearchEvent): Observable<Event[]> {
    return this.http.post<Event[]>(`${environment.apiBaseUrl}/event/getBySearch`, search);
  }

  public deleteEvent(eventId: string): Observable<Event> {
    return this.http.delete<Event>(`${environment.apiBaseUrl}/event/${eventId}/delete`);
  }

}

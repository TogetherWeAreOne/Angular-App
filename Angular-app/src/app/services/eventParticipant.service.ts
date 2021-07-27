import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Event} from "../models/event.model";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {EventParticipant} from "../models/eventParticipant.model";
import {Product} from "../models/product.model";

@Injectable({providedIn: 'root'})
export class EventParticipantService {

  public eventParticipant: Observable<EventParticipant>;
  private eventParticipantSubject: BehaviorSubject<EventParticipant>;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.eventParticipantSubject = new BehaviorSubject<EventParticipant>({});
    this.eventParticipant = this.eventParticipantSubject.asObservable();
  }

//  title: string, description: string, maxParticipant: number, minParticipant: number,image: string, address: string, zip: string, country: string, startDate: string, endDate: string, eventType: string
  public createEvent(event: Event): Observable<EventParticipant> {
    console.log("icicicicicicici");
    return this.http.post<EventParticipant>(`${environment.apiBaseUrl}/event/create`, event)
      .pipe(map(event => {
        console.log("......." + event);
        return event;
      }));
  }

  public getUserEventParticipation(): Observable<EventParticipant[]> {
    return this.http.get<EventParticipant[]>(`${environment.apiBaseUrl}/event/getMyEventParticipation`);
  }

  public joinEvent(event : Event): Observable<EventParticipant> {
    return this.http.post<EventParticipant>(`${environment.apiBaseUrl}/event/join/${event.id}`, undefined);
  }

  public leaveEvent(event : Event): Observable<EventParticipant> {
    return this.http.delete<EventParticipant>(`${environment.apiBaseUrl}/event/leave/${event.id}`);
  }

  public getMyParticipation(): Observable<EventParticipant[]> {
    return this.http.get<EventParticipant[]>(`${environment.apiBaseUrl}/event/getMyEventParticipation`);
  }

  public getParticipants(eventId : string): Observable<EventParticipant[]> {
    return this.http.get<EventParticipant[]>(`${environment.apiBaseUrl}/event/${eventId}/getParticipant`);
  }

}

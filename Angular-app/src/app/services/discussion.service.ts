import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Event} from "../models/event.model";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Discussion} from "../models/discussion.model";
import {DiscussionMessage} from "../models/discussionMessage.model";
import {D} from "@angular/cdk/keycodes";

@Injectable({providedIn: 'root'})
export class DiscussionService {

  public discussion: Observable<Discussion>;
  private discussionSubject: BehaviorSubject<Discussion>;
  public discussionMessage: Observable<DiscussionMessage>;
  private discussionMessageSubject: BehaviorSubject<DiscussionMessage>;
  public event: Observable<Event>;
  private eventSubject: BehaviorSubject<Event>;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.discussionSubject = new BehaviorSubject<Discussion>({title: "none"});
    this.discussion = this.discussionSubject.asObservable();
    this.discussionMessageSubject = new BehaviorSubject<DiscussionMessage>({content: "none"});
    this.discussionMessage = this.discussionMessageSubject.asObservable();
    this.eventSubject = new BehaviorSubject<Event>({title: "none"});
    this.event = this.eventSubject.asObservable();
  }

  getDiscussionById(eventId: string) : Observable<Discussion> {
      return this.http.get<Discussion>(`${environment.apiBaseUrl}/discussion/${eventId}/getDiscussion`)
  }

  getMessageByDiscussion(discussionId: string) : Observable<DiscussionMessage[]> {
    return this.http.get<DiscussionMessage[]>(`${environment.apiBaseUrl}/discussion/${discussionId}/getMessages`)
  }

  getEventByDiscussion(discussionId: string) : Observable<Event> {
    return this.http.get<Event>(`${environment.apiBaseUrl}/discussion/${discussionId}/getEvent`)
  }

  sendMessage(content : DiscussionMessage, discussionId:string) : Observable<DiscussionMessage> {
    return this.http.post<DiscussionMessage>(`${environment.apiBaseUrl}/discussion/${discussionId}/send`, content)
  }


}

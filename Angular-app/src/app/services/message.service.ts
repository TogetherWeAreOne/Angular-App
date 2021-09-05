import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DiscussionUserParticipant} from "../models/discussionUserParticipant.model";
import {DiscussionUser} from "../models/discussionUser.model";
import {DiscussionMessage} from "../models/discussionMessage.model";
import {Message} from "../models/message.model";
import {User} from "../models/user.model";

@Injectable({providedIn: 'root'})
export class MessageService {

  constructor(private cookieService: CookieService, private http: HttpClient) {
  }

  getMyDiscussionsParticipation() : Observable<DiscussionUserParticipant[]> {
    return this.http.get<DiscussionUserParticipant[]>(`${environment.apiBaseUrl}/message/getAllMyDiscussion`);
  }

  getDiscussionByParticipation(participation : DiscussionUserParticipant) : Observable<DiscussionUser> {
    return this.http.get<DiscussionUser>(`${environment.apiBaseUrl}/message/${participation.discussion.id}/getDiscussion`);
  }

  getInterlocutorByDiscussion(discussion : DiscussionUser) : Observable<DiscussionUserParticipant> {
    return this.http.get<DiscussionUserParticipant>(`${environment.apiBaseUrl}/message/${discussion.id}/getInterlocutor`);
  }

  getMessageByDiscussion(discussion : DiscussionUser ) : Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiBaseUrl}/message/${discussion.id}/getAllMessage`);
  }

  sendMessage( user: User, message : string ): Observable<Message> {
    return this.http.post<Message>(`${environment.apiBaseUrl}/message/send/${user.id}`, { content : message});
  }


}

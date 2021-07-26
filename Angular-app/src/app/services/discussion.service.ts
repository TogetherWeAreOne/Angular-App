import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.model";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Discussion} from "../models/discussion.model";

@Injectable({providedIn: 'root'})
export class DiscussionService {

  public discussion: Observable<Discussion>;
  private discussionSubject: BehaviorSubject<Discussion>;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.discussionSubject = new BehaviorSubject<Discussion>({title: "none"});
    this.discussion = this.discussionSubject.asObservable();
  }

  public login(email: string, password: string): Observable<User> {
    console.log("icicicicicicici");

    return this.http.post<User>(`${environment.apiBaseUrl}/auth/login`, {
      email,
      password
    })
      .pipe(map(user => {
        console.log(user);
        this.cookieService.set('user', user.id as string, 3, "", environment.domain, false, 'Strict');
        console.log(".......");
        return user;
      }));
  }


}

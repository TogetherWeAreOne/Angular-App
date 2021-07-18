import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthService {

  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>({email: "none"});
    this.user = this.userSubject.asObservable();
  }

  public login(email: string, password: string): Observable<User> {
    console.log("icicicicicicici");
    return this.http.post<User>(`${environment.apiBaseUrl}/auth/login`, {
      email,
      password
    })
      .pipe(map(user => {
        this.cookieService.set('user', user.email, 3, "", environment.domain, false, 'Strict');
        console.log("......." + user);
        return user;
      }));
  }

  public logout(): Observable<unknown> {
    this.userSubject.next({email: "none"});
    this.cookieService.delete('user');
    return this.http.delete(`${environment.apiBaseUrl}/auth/logout`);
  }
}

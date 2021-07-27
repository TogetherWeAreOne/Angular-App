import {Injectable, Injector} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";


@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {


  constructor(private router: Router, private inj: Injector, private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      withCredentials: true,
      headers: request.headers.set('Access-Control-Allow-Origin', "*")
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService = this.inj.get(AuthService)
            this.authService.logout();
            this.router.navigateByUrl("/auth");
          }
          return throwError(error);
        }
      ));
  }
}

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService implements HttpInterceptor {

  // http interceptor, ami ellenőrzi a tokent, és ha lejárt a felhasználót a Bejelentkezéshez navigálja
  constructor(private router : Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          localStorage.removeItem('token');
          this.router.navigate(["/login"]);
        }
        return throwError(() => error);
      })
    );
  }
}

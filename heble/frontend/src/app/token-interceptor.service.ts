import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private userService:UserService) { }

  // interceptor függvény: a kérésfejlécbe beállítja a felhasználó tokenjét
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: "Bearer " + this.userService.getToken()
      }
    })

    return next.handle(tokenizedRequest);
  }
}

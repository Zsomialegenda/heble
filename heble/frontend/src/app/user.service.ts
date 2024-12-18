// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/signup';

  constructor(private http: HttpClient) {}

  signup(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }
}

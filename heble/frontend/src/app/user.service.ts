// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseURL = "http://localhost:3000/users/";

  signupEnd = "signup";
  loginEnd = "login";

  constructor(private http: HttpClient) {}

  signup(users:any) {
    return this.http.put(this.baseURL + this.signupEnd, users);
  }

  login(users:any) {
    return this.http.post(this.baseURL + this.loginEnd, users);
  }

  loggedIn():boolean {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }
}

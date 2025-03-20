import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = 'http://localhost:3000/users/';

  signupEnd = 'signup';
  loginEnd = 'login';
  forgotPasswordEnd = 'forgot';
  changePasswordEnd = 'forgot/reset';

  constructor(private http: HttpClient) {}

  signup(users: any) {
    return this.http.post(this.baseURL + this.signupEnd, users);
  }

  login(users: any) {
    return this.http.post(this.baseURL + this.loginEnd, users);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  token: any;
  payload: any;

  getRole(): any {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.payload = this.decodeToken(this.token);
      console.log(this.payload.role);

      return this.payload.role;
    }
  }

  getUserID(): any {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.payload = this.decodeToken(this.token);
      console.log('a felhasználói id ' + this.payload.userId);

      return this.payload.userId;
    }return 0;
  }

  getUserData() {
    const userId = this.getUserID();
    if (userId) {
      return this.http.get(`${this.baseURL}${userId}`);
    } else {
      return null;
    }
  }

  forgotPassword(userData: any) {
    return this.http.put(this.baseURL + this.forgotPasswordEnd, userData);
  }

  changePassword(userData: any) {
    return this.http.put(this.baseURL + this.changePasswordEnd, userData);
  }

  isAdmin(): boolean {
    return this.payload.role == 'admin' ? true : false;
  }
}

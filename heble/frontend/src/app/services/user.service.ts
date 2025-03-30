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
  logoutEnd = 'logout';
  forgotPasswordEnd = 'forgot';
  changePasswordEnd = 'forgot/reset';

  constructor(private http: HttpClient) { }

  // regisztrációért felelős függvény
  signup(users: any) {
    return this.http.post(this.baseURL + this.signupEnd, users);
  }

  // bejelenkezésért felelős függvény
  login(users: any) {
    return this.http.post(this.baseURL + this.loginEnd, users);
  }

  // a függvény ellenőrzi, hogy a felhasználó be van-e jelentkezve, ha igen akkor visszatér a localStorage-ban található tokennel
  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // kijelentkezésért felelős függvény
  signOut(users: any) {
    return this.http.post(this.baseURL + this.logoutEnd, users);
  }
  
  // token lekérdezésének függvénye
  getToken() {
    return localStorage.getItem('token');
  }

  // token dekódolására használt függvény
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

  // a szerepkör kinyerése a tokenből
  getRole(): any {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.payload = this.decodeToken(this.token);
      //console.log(this.payload.role);

      return this.payload.role;
    }
  }

  // userID kinyerése a tokenből
  getUserID(): any {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.payload = this.decodeToken(this.token);
      //console.log('A felhasználói id: ' + this.payload.userId);

      return this.payload.userId;
    } return 0;
  }

  // felhasználói adatlekérése
  getUserData() {
    const userId = this.getUserID();
    if (userId) {
      return this.http.get(`${this.baseURL}${userId}`);
    } else {
      return null;
    }
  }

  // email-cím frissítésért felelős függvény
  updateEmail(body: {newEmail: string; secureAnswer: string }) {
    return this.http.patch(`${this.baseURL}update`, body);
  }

  // jelszó helyreállításáért felelős függvény
  forgotPassword(userData: any) {
    return this.http.put(this.baseURL + this.forgotPasswordEnd, userData);
  }

  // jelszó megváltoztatásért felelős függvény
  changePassword(userData: any) {
    return this.http.put(this.baseURL + this.changePasswordEnd, userData);
  }

  // a függvény ellenőrzi, hogy a felhasználó szerepköre admin-e
  isAdmin(): boolean {
    return this.payload.role == 'admin' ? true : false;
  }
}

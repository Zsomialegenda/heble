import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  constructor(private http:HttpClient) { }

  baseURL = "http://localhost:3000/userAchivements/";
  
  getAchievements(userId:number){
    return this.http.get(`${this.baseURL}${userId}`)
  }
}

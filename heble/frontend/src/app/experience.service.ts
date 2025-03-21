import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private http:HttpClient) { }

  baseURL = "http://localhost:3000/experiences/";
  
  //függvény a tapasztalatpontok lekérésére
  getExp(userId:number){
    return this.http.get(`${this.baseURL}${userId}`)
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  constructor(private http:HttpClient) { }

  baseURL = "http://localhost:3000/exercises/";

  getExperience(id:number){
    return this.http.get(this.baseURL + `/${id}`);
  }
}

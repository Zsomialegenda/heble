import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from '../interfaces/exercise';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  baseURL = 'http://localhost:3000/exercises/';

  //függvény gyakorlat hozzáadásához
  addExercise(exercises: Exercise) {
    return this.http.post(this.baseURL + 'log', exercises);
  }

  //függvény az elvégzett gyakorlatok lekérésére
  getExercises(userId: number) {
    return this.http.get(`${this.baseURL}${userId}`);
  }
}

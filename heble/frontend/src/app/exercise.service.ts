import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from './exercise';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  baseURL = 'http://localhost:3000/exercises/';

  /* getExperience(id: number) {
    return this.http.get(this.baseURL + `/${id}`);
  }*/

  addExercise(exercises: Exercise) {
    return this.http.post(this.baseURL + 'log', exercises);
  }
}

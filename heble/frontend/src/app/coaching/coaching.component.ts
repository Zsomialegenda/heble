import { Component, OnInit } from '@angular/core';
import { ExercisesService } from '../exercises.service';

@Component({
  selector: 'app-coaching',
  imports: [],
  templateUrl: './coaching.component.html',
  styleUrl: './coaching.component.css'
})
export class CoachingComponent implements OnInit {
  constructor(private exercisesService:ExercisesService) { }

  ngOnInit(): void {
    
  }

  exercises:any
}

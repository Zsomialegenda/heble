import { Component, OnInit } from '@angular/core';
import { Experience } from '../experience';
import { ExperienceService } from '../experience.service';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Exercise } from '../exercise';
import { ExerciseService } from '../exercise.service';


@Component({
  selector: 'app-coaching',
  imports: [CommonModule, FormsModule],
  templateUrl: './coaching.component.html',
  styleUrl: './coaching.component.css'
})
export class CoachingComponent implements OnInit {
  constructor(private experienceService:ExperienceService, private userService:UserService, private exerciseService:ExerciseService ) { }
  
  experience:Experience={id:0, userId:0, level:0, xp:0,  xpToNextLevel:0}

  userID:any;

  ngOnInit(): void {
    this.userID = this.userService.getUserID()
    this.experienceService.getExp(this.userID).subscribe({
      next:(res:any)=> {

        this.experience = res.data;
      },
      error:(err:HttpErrorResponse)=> {
        alert(err.message);
      }
    })
  }

  exercise: Exercise={pushUps:0, pullUps:0, sitUps:0, squats:0, running:0 }

  addExercise(){
    this.exerciseService.addExercise(this.exercise).subscribe({
      next:(res:any) => {
        alert("Sikeres gyakorlatrögzítés!")
        window.location.reload()
      },error:(err:HttpErrorResponse) => {
        alert(err.message);
      }
    })
  }
}

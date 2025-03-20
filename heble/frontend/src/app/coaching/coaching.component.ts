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
  successMessage: string = '';
  errorMessage: string = '';

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

  exercise: Exercise={pushUps: undefined, pullUps: undefined, sitUps: undefined, squats: undefined, running: undefined }

  addExercise(){
    this.exerciseService.addExercise(this.exercise).subscribe({
      next:(res:any) => {
        this.successMessage = "Sikeres gyakorlatrögzítés!";
        setTimeout(() => {
          window.location.reload();
        }, 1500)
      },error:(err:HttpErrorResponse) => {
        this.errorMessage = "Sikertelen gyakorlatrögzítés!";

        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
      }
    })
  }
}

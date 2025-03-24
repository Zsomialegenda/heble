import { Component, OnInit } from '@angular/core';
import { Experience } from '../interfaces/experience';
import { ExperienceService } from '../services/experience.service';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Exercise } from '../interfaces/exercise';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-coaching',
  imports: [CommonModule, FormsModule],
  templateUrl: './coaching.component.html',
  styleUrl: './coaching.component.css',
})
export class CoachingComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';

  constructor( private experienceService: ExperienceService, private userService: UserService, private exerciseService: ExerciseService ) {}

  experience: Experience = { id: 0, userId: 0, level: 0, xp: 0, xpToNextLevel: 0 };

  userID: any;

  // a komponens betöltésekor a tapasztalatpont lekérdezése a bejelentkezett felhasználóhoz kötődően 
  ngOnInit(): void {
    this.userID = this.userService.getUserID();
    this.experienceService.getExp(this.userID).subscribe({
      next: (res: any) => {
        this.experience = res.data;
      },
      error: (err: HttpErrorResponse) => {
        //alert(err.message);
      },
    });
  }

  exercise: Exercise = { pushUps: undefined, pullUps: undefined, sitUps: undefined, squats: undefined, running: undefined };

  // gyakorlat hozzáadása az opciónálisan kiválasztott gyakorlattípusokból, dinamikus tapasztalatpont számítása a megadott gyakorlatokból
  addExercise() {
    this.exerciseService.addExercise(this.exercise).subscribe({
      next: (res: any) => {
        this.successMessage = 'Sikeres gyakorlatrögzítés!';
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Sikertelen gyakorlatrögzítés!';

        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      },
    });
  }
}

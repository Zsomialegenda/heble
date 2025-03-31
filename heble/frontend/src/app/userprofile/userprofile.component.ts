import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ExerciseService } from '../services/exercise.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Exercise } from '../interfaces/exercise';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  imports: [CommonModule, FormsModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
})
export class UserprofileComponent implements OnInit {
  constructor(private userService: UserService, private exerciseService: ExerciseService) { }

  successMessage: string = '';
  errorMessage: string = '';

  userData = {
    newEmail: '',
    secureAnswer: '',
  };

  user: any;
  userID: any;
  exercises: Exercise | null = null;

  // a komponens betöltésekor a személyes adatok és az elvégzett gyakorlatok lekérdezése a bejelentkezett felhasználóhoz kötődően
  ngOnInit(): void {
    this.userID = this.userService.getUserID();

    if (this.userID) {
      const UserData = this.userService.getUserData();
      if (UserData) {
        UserData.subscribe({
          next: (res: any) => {
            this.user = res;
            // console.log(this.user);
          },
          error: (err: HttpErrorResponse) => {
            alert(err.message);
          },
        });
      }

      this.exerciseService.getExercises(this.userID).subscribe({
        next: (res: any) => {
          this.exercises = res.data;
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        },
      });
    }
  }

  // a felhasználói fiókhoz rendelt email-cím megváltoztatása biztonsági jelszó alapján, egy új email-címért felelős metódus
  submitData() {
    // console.log(this.userData);

    this.userService.updateEmail({ newEmail: this.userData.newEmail, secureAnswer: this.userData.secureAnswer }).subscribe({
      next: (res: any) => {
        this.successMessage = 'Sikeres email-cím frissítés!';
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Sikertelen email-cím frissítés!';

        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      },
    });
  }
}

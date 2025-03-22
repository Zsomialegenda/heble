import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ExerciseService } from '../services/exercise.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Exercise } from '../interfaces/exercise';

@Component({
  selector: 'app-userprofile',
  imports: [CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
})
export class UserprofileComponent implements OnInit {
  constructor(private userService: UserService, private exerciseService:ExerciseService) {}

  user: any;
  userID: any;
  exercises: Exercise | null = null;

  ngOnInit(): void {
    this.userID = this.userService.getUserID();
    
    if (this.userID) {
      const UserData = this.userService.getUserData();
      if (UserData) {
        UserData.subscribe({
        next: (res: any) => {
          this.user = res;
          console.log(this.user);
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
}

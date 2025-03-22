import { Component } from '@angular/core';
import { AchievementService } from '../services/achievement.service';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Achievement } from '../interfaces/achievement';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-achievements',
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css'
})

// a komponens betöltésekor lefutó metódus, ami az elért achievementek megjelenítésért felel
export class AchievementsComponent {
  constructor(private achievementservice: AchievementService, private userService: UserService) { }
  achievements: Achievement[] = []

  userID: any;
  ngOnInit(): void {
    this.userID = this.userService.getUserID()
    this.achievementservice.getAchievements(this.userID).subscribe({
      next: (res: any) => {

        this.achievements = res.data;
        console.log(this.achievements);
      },
      error: (err: HttpErrorResponse) => {
        //alert(err.message);
      }
    })
  }
}

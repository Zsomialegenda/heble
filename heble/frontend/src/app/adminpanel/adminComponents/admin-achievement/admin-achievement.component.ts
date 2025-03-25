import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AddAchievement } from '../../../interfaces/add-achievement';

@Component({
  selector: 'app-admin-achievement',
  imports: [],
  templateUrl: './admin-achievement.component.html',
  styleUrl: './admin-achievement.component.css',
})
export class AdminAchievementComponent {
  constructor(private http: HttpClient, private adminService: AdminService) {}

  newAchievements: AddAchievement[] = [];

  updateAchievement(
    id: number,
    name: string,
    description: string,
    pushUpsRequired: number,
    pullUpsRequired: number,
    sitUpsRequired: number,
    squatsRequired: number,
    runningRequired: number
  ) {
    const updatedAchievement = {
      name,
      description,
      pushUpsRequired,
      pullUpsRequired,
      sitUpsRequired,
      squatsRequired,
      runningRequired,
    };
    this.adminService.updateAchievement(id, updatedAchievement).subscribe({
      next: (res: any) => {
        alert('Teljesítmény sikeresen frissítve!');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  addAchievement(
    name: string,
    description: string,
    pushUpsRequired: number,
    pullUpsRequired: number,
    sitUpsRequired: number,
    squatsRequired: number,
    runningRequired: number
  ): void {
    const newAchievement: AddAchievement = {
      id: this.newAchievements.length + 1,
      name,
      description,
      pushUpsRequired,
      pullUpsRequired,
      sitUpsRequired,
      squatsRequired,
      runningRequired,

    };

    this.adminService.addAchievement(newAchievement).subscribe({
      next: (data) => {
        alert(data.üzenet || 'Achievement sikeresen hozzáadva!');
      },
      error: () => {
        console.log('Hiba történt az achievement hozzáadása során.');
      },
    });
  }
}
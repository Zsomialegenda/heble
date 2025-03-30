import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// gyerekkomponensek importálása
import { AdminUserManagementComponent } from "./adminComponents/admin-user-management/admin-user-management.component";
import { AdminStatisticsComponent } from "./adminComponents/admin-statistics/admin-statistics.component";
import { AdminAchievementComponent } from "./adminComponents/admin-achievement/admin-achievement.component";


Chart.register(...registerables);

@Component({
  selector: 'app-adminpanel',
  imports: [CommonModule, FormsModule, AdminUserManagementComponent, AdminStatisticsComponent, AdminAchievementComponent],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.css',
})
export class AdminpanelComponent implements OnInit {
  constructor(private http: HttpClient, private adminService: AdminService) {}
  private achievementChart?: Chart;
  private exerciseChart?: Chart;

  leaderboards: { [key: string]: any[] } = {};
  leaderboardData: any[] = [];


  ngOnInit() {
    this.loadAchievementChart();
    this.loadExerciseChart();
    // ranglisták lekérése
    this.fetchLeaderboard('pushUpsLeaderBoard', 'exercise', 'pushUps');
    this.fetchLeaderboard('pullUpsLeaderBoard', 'exercise', 'pullUps');
    this.fetchLeaderboard('sitUpsLeaderBoard', 'exercise', 'sitUps');
    this.fetchLeaderboard('squatsLeaderBoard', 'exercise', 'squats');
    this.fetchLeaderboard('runningLeaderBoard', 'exercise', 'running');
    this.fetchLeaderboard('xpLeaderBoard', 'xp');
    this.fetchLeaderboard('userAchievementLeaderBoard', 'achievements');
  }

  async loadAchievementChart() {
    this.adminService.getAchievementStats().subscribe({
      next: (res: any) => {
        const data = res.data;
        const labels = data.map((item: any) => item.title);
        const values = data.map((item: any) => item.totalUsers);

        const ctx = document.getElementById(
          'achievementChart'
        ) as HTMLCanvasElement;

        if (this.achievementChart) {
          this.achievementChart.destroy();
        }

        this.achievementChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Achievementek',
                data: values,
                backgroundColor: '#91182b',
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' },
            },
            scales: {
              y: { beginAtZero: true },
            },
          },
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
      },
    });
  }

  async loadExerciseChart() {
    this.adminService.getExerciseStats().subscribe({
      next: (res: any) => {
        const labels = [
          'Fekvőtámasz',
          'Húzódzkodás',
          'Felülés',
          'Guggolás',
          'Futás',
        ];
        const data = [
          res.totalPushUps || 0,
          res.totalPullUps || 0,
          res.totalSitUps || 0,
          res.totalSquats || 0,
          res.totalRunning || 0,
        ];

        const ctx = document.getElementById(
          'exerciseChart'
        ) as HTMLCanvasElement;
        if (ctx) {
          this.exerciseChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels,
              datasets: [
                {
                  label: 'Összes gyakorlat',
                  data,
                  backgroundColor: '#91182b',
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: { position: 'top' },
              },
              scales: {
                y: { beginAtZero: true },
              },
            },
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
      },
    });
  }

  fetchLeaderboard(tableId: string, category: string, type: string = ''): void {
    this.adminService.getLeaderboard(category, type).subscribe({
      next: ({ users }) => {
        if (Array.isArray(users)) {
          this.leaderboards[tableId] = users.map((user) => ({
            ...user,
            username: user.firstName + ' ' + user.lastName,
          }));
        } else {
          console.error(
            'Hiba: A leaderboard API nem tartalmaz megfelelő adatokat:',
            users
          );
          this.leaderboards[tableId] = [];
        }
      },
      error: (error) => {
        console.error(`Hiba a ${tableId} leaderboard betöltésekor:`, error);
        this.leaderboards[tableId] = [];
      },
    });
  }

}

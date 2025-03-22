import {
  Component,
  OnInit
} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-statistics',
  imports: [CommonModule],
  templateUrl: './admin-statistics.component.html',
  styleUrl: './admin-statistics.component.css'
})
export class AdminStatisticsComponent implements OnInit{
  allUsersCount: any;
  activeUsersCount: any;

  totalPushUps: any;
  totalSitUps: any;
  totalPullUps: any;
  totalSquats: any;
  totalRunning: any;


  private achievementChart?: Chart;
  private exerciseChart?: Chart;

  constructor(private http: HttpClient, private adminService: AdminService) {}
  ngOnInit() {
      this.allUsersCount = this.adminService.getAllUsers().subscribe({
        next: (res: any) => {
          this.allUsersCount = res.userCount;
        },
        error: (err: HttpErrorResponse) => {
          alert(err);
        },
      });
      this.activeUsersCount = this.adminService.getActiveUsers().subscribe({
        next: (res: any) => {
          this.activeUsersCount = res.tokenCount;
        },
        error: (err: HttpErrorResponse) => {
          alert(err);
        },
      });

      this.totalPushUps = this.adminService.getTotalPushUps().subscribe({
        next: (res: any) => {
          this.totalPushUps = res.total;
        },
        error: (err: HttpErrorResponse) => {
          alert(err);
        },
      });
      this.totalPullUps = this.adminService.getTotalPullUps().subscribe({
        next: (res: any) => {
          this.totalPullUps = res.total;
        },
        error: (err: HttpErrorResponse) => {
          alert(err);
        },
      });
      this.totalSitUps = this.adminService.getTotalSitUps().subscribe({
        next: (res: any) => {
          this.totalSitUps = res.total;
        },
        error: (err: HttpErrorResponse) => {
          alert(err);
        },
      });
      this.totalSquats = this.adminService.getTotalSquats().subscribe({
        next: (res: any) => {
          this.totalSquats = res.total;
        },
        error: (err: HttpErrorResponse) => {
          alert(err);
        },
      });
      this.totalRunning = this.adminService.getTotalRunning().subscribe({
        next: (res: any) => {
          this.totalRunning = res.total;
        },
        error: (err: HttpErrorResponse) => {
          alert(err);
        },
      });

      this.loadAchievementChart();
      this.loadExerciseChart();
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
}

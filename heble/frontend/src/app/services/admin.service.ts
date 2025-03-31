import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  private baseURL = 'http://localhost:3000/';

  usersEnd = 'users/';
  exerciseEnd = 'exercises/';
  achievementsEnd = 'achievements/';

  exerciseStatisticEnd = 'stats/';

  exerciseChartEnd = 'sum';
  userAchievementChartEnd = 'userAchivements/stats/sum';

  countUsersEnd = 'count';
  activeUsersEnd = 'tokens/count';

  pushUpsEnd = 'pushUps';
  pullUpsEnd = 'pullUps';
  sitUpsEnd = 'sitUps';
  squatsEnd = 'squats';
  runningEnd = 'running';

  getExerciseStats() {
    return this.http.get(
      this.baseURL +
        this.exerciseEnd +
        this.exerciseStatisticEnd +
        this.exerciseChartEnd
    );
  }

  getAchievementStats() {
    return this.http.get(this.baseURL + this.userAchievementChartEnd);
  }

  getLeaderboard(category: string, type: string = '') {
    const endpoint = type
      ? `${this.baseURL}leaderboard/exercise/${type}`
      : `${this.baseURL}leaderboard/${category}`;
    return this.http.get<{ message: string; users: any[] }>(endpoint);
  }

  getAllUsers() {
    return this.http.get(this.baseURL + this.usersEnd + this.countUsersEnd);
  }
  getActiveUsers() {
    return this.http.get(this.baseURL + this.activeUsersEnd);
  }

  getUserByEmail(email: string) {
    return this.http.post(this.baseURL + this.usersEnd + 'email/', { email });
  }

  getTotalPushUps() {
    return this.http.get(
      this.baseURL +
        this.exerciseEnd +
        this.exerciseStatisticEnd +
        this.pushUpsEnd
    );
  }
  getTotalPullUps() {
    return this.http.get(
      this.baseURL +
        this.exerciseEnd +
        this.exerciseStatisticEnd +
        this.pullUpsEnd
    );
  }
  getTotalSitUps() {
    return this.http.get(
      this.baseURL +
        this.exerciseEnd +
        this.exerciseStatisticEnd +
        this.sitUpsEnd
    );
  }
  getTotalSquats() {
    return this.http.get(
      this.baseURL +
        this.exerciseEnd +
        this.exerciseStatisticEnd +
        this.squatsEnd
    );
  }
  getTotalRunning() {
    return this.http.get(
      this.baseURL +
        this.exerciseEnd +
        this.exerciseStatisticEnd +
        this.runningEnd
    );
  }

  addAchievement(achievement: {
    name: string;
    description: string;
    pushUpsRequired: number;
    pullUpsRequired: number;
    squatsRequired: number;
    runningRequired: number;
  }) {
    return this.http.post<{ üzenet: string }>(
      this.baseURL + this.achievementsEnd,
      achievement
    );
  }

  deleteUser(email: string, password: string, secureAnswer: string) {
    const body = { email, password, secureAnswer };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.request('DELETE', this.baseURL + this.usersEnd + 'delete/', { body, headers });
  }


  updateAchievement(id: number, achievementData: any) {
    return this.http.patch(
      this.baseURL + this.achievementsEnd + id,
      achievementData
    );
  }
}

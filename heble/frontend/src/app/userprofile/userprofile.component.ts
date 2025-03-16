import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-userprofile',
  imports: [CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
})
export class UserprofileComponent implements OnInit {
  constructor(private userService: UserService) {}

  user: any;

  ngOnInit(): void {
    const userData = this.userService.getUserData();
    if (userData) {
      userData.subscribe({
        next: (res: any) => {
          this.user = res;
          console.log(this.user);
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        },
      });
    }
  }
}

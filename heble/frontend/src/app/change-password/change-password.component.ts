import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  constructor(private userService: UserService, private router: Router) {}

  userData = {
    email: localStorage.getItem("email"),
    newPassword: '',
  };

  submitData() {
    console.log(this.userData);

    this.userService.changePassword(this.userData).subscribe({
      next: (res: any) => {
        alert(res);
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      },
    });
  }
}

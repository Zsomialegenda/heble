import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recoverlogin',
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './recoverlogin.component.html',
  styleUrl: './recoverlogin.component.css',
})
export class RecoverloginComponent {
  constructor(private userService: UserService, private router: Router) {}

  userData = {
    email: '',
    secureAnswer: '',
  };

  submitData() {
    console.log(this.userData);

    this.userService.forgotPassword(this.userData).subscribe({
      next: (res: any) => {
        alert(res);
        this.router.navigate(['/changePassword']);
        localStorage.setItem('email', this.userData.email);
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      },
    });
  }
}

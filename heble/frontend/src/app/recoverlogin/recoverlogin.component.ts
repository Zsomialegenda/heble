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
        this.showToast('SuccessfulRecover');

        localStorage.setItem('email', this.userData.email);
        setTimeout(() => {
          this.router.navigate(['/changePassword']);
        }, 2000);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.showToast('userNotFound');
        } else if (err.status === 401 || err.status === 403) {
          this.showToast('unauthorizedRecover');
        }
        console.log(err);
      },
    });
  }

  private showToast(toastId: string) {
    const toastElement = document.getElementById(toastId);
    if (toastElement) {
      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
    }
  }
}

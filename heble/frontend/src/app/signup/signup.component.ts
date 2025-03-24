import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private userService: UserService, private router: Router) {}

  registerUserData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    secureAnswer: '',
  };

  validEmail = false;
  toasts: { message: string; type: string }[] = [];

  // a signup metódus felel a regisztrációért, sikeres regisztráció esetén átnavigál a bejelentkezésért felelős komponensre. Sikertelenség esetén hibát add vissza, emellett a metódus ellenőrzi az email-cím helyes szerkezetét.
  signup() {
    // email-cím feltételek (@ jel, email hossza, . ellenőrzése, . utáni domain cím)
    const emailParts = this.registerUserData.email.split('@');

    if (emailParts.length !== 2 || emailParts[0].length < 5) {
      this.validEmail = false;
    } else {
      const domain = emailParts[1];
      const domainParts = domain.split('.');
      const lastPart = domainParts[domainParts.length - 1];

      this.validEmail = domainParts.length > 1 && lastPart.length >= 2 && !domain.endsWith('.');
    }

    if (this.validEmail) {
      console.log(this.registerUserData);

      this.userService.signup(this.registerUserData).subscribe({
        next: (res: any) => {
          this.showToast('SuccessfulSignup');

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.showToast('missingdataatSignup');
          } else if (err.status === 401 || err.status === 403) {
            this.showToast('unauthorizedSignup');
          } else if (err.status === 409) {
            this.showToast('EmailAlreadyInUse');
          } else if (err.status === 500) {
            this.showToast('erroratSignup');
          }
          console.log(err);
        },
      });
    } else {
      this.showToast('IncorrectEmail');
    }
  }

  // A felugró értesítéseket kezelő metódus
  private showToast(toastId: string) {
    const toastElement = document.getElementById(toastId);
    if (toastElement) {
      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../user.service';
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

  signup() {
    const email_ = this.registerUserData.email.split('');
    console.log(email_);

    if (email_.length < 10) {
      this.validEmail = false;
    } else {
      for (let i = 0; i < email_.length; i++) {
        if (email_[i] === '@') {
          this.validEmail = true;
          break;
        }
      }
    }

    if (this.validEmail) {
      console.log(this.registerUserData);

      this.userService.signup(this.registerUserData).subscribe({
        next: (res: any) => {
          alert('Sikeres regisztráció! ');
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            alert('Hiányzó adatok! ');
          } else if (err.status === 401 || err.status === 403) {
            alert('Jogosulatlan kérés! ');
          } else if (err.status === 400) {
            alert('A felhasználónév vagy az email foglalt!');
          } else if (err.status === 500) {
            alert('Valami hiba történt a regisztráció során!');
          }
          console.log(err);
        },
      });
    } else {
      alert('Érvénytelen email cím!');
    }
  }
}

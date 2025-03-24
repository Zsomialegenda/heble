import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  constructor(private userService: UserService, private router: Router) { }

  userData = {
    email: localStorage.getItem('email'),
    newPassword: '',
  };

  // jelszó megváltoztatásáért felelős függvény, ami sikeres jelszómegadást követően megváltoztatja a felhasználó jelszavát
  submitData() {
    console.log(this.userData);

    this.userService.changePassword(this.userData).subscribe({
      next: (res: any) => {
        this.showToast('SuccessfulPasswordChange');
        localStorage.removeItem('email');

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err: HttpErrorResponse) => {
        this.showToast('SomethingWentWrong');
      },
    });
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

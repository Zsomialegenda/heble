import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-user-management',
  imports: [CommonModule],
  templateUrl: './admin-user-management.component.html',
  styleUrl: './admin-user-management.component.css',
})
export class AdminUserManagementComponent {

  @ViewChild('deleteEmail') deleteEmail!: ElementRef;
  @ViewChild('deletePassword') deletePassword!: ElementRef;
  @ViewChild('secureAnswer') secureAnswer!: ElementRef;

  foundUser: any;
  userNotFound: any;

  constructor(private http: HttpClient, private adminService: AdminService) {}

  getUserByEmail(email: string) {
    this.adminService.getUserByEmail(email).subscribe({
      next: (user) => {
        this.foundUser = user;
        this.userNotFound = false;
      },
      error: () => {
        this.foundUser = null;
        this.userNotFound = true;
      },
    });
  }

  deleteUser(email: string, password: string, secureAnswer: string) {
    if (!email || !password || !secureAnswer) {
      alert('Minden mezőt ki kell tölteni!');
      return;
    }

    this.adminService.deleteUser(email, password, secureAnswer).subscribe({
      next: (response: any) => {
        alert(response.message);
      },
      error: (error) => {
        console.log(error.error?.reason?.[0] || 'Hiba történt a törlés során.');
      },
    });
  }
}

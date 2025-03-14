import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  constructor(public userService: UserService, private router: Router) {}

  SignOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  role: any;
  ngOnInit(): void {
    this.role = this.userService.getRole();
    if (this.role == 'admin') this.isAdmin = true;
  }

  isAdmin: boolean = false;
}

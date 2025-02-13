import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(public userService:UserService, private router:Router) {}

  SignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    this.router.navigate(["/login"]);
  }
}

import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private userService:UserService, private router:Router) {}
 
  loginUserData = {
    email: "",
    password: ""
  }

    login() {
         console.log(this.loginUserData);
      
         this.userService.login(this.loginUserData).subscribe({
           next: (res:any) =>{            
            localStorage.setItem("token", res.token);
            localStorage.setItem("userId", res.userId);

            this.showToast('SuccessfulLogin');

            setTimeout(() => {
              this.router.navigate(["/coaching"]);
            }, 3500);
           }, 
           error: (err:HttpErrorResponse) => {
              if(err.status === 404) {
                this.showToast('missingdataatLogin');
              }else if(err.status === 401 || err.status === 403) {
                this.showToast('unauthorizedLogin');
              }else if(err.status === 500) {
                this.showToast('erroratLogin');
              }
              console.log(err);
           }
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
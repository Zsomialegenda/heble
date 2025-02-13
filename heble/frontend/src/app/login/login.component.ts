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
            alert("Sikeres belépés " + 200);
            this.router.navigate(["/coaching"]);
            
            localStorage.setItem("token", res.token);
            localStorage.setItem("uid", res.uid);
           }, 
           error: (err:HttpErrorResponse) => {
              if(err.status === 404) {
                alert("Hiányzó adatok " + 404)
              }else if(err.status === 401 || err.status === 403) {
                alert("Jogosulatlan kérés " + 401)
              }else if(err.status === 500) {
                alert("Valami hiba történt a belépés során! " + 500)
              }
              console.log(err);
           }
         })

    }

}

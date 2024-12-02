import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginObj: Login = new Login();

  constructor(private http: HttpClient) {}

  onLogin() {
    if (!this.loginObj.emailId || !this.loginObj.password) {
      alert('Both email and password are required.');
      return;
    }

    this.http.post('http://localhost:3000/user/login', this.loginObj).subscribe(
      (res: any) => {
        if (res.result) {
          alert('Login successful');
          // Perform further actions on successful login, e.g., navigation
        } else {
          alert(res.message || 'Login failed');
        }
      },
      (error) => {
        console.log('Error occurred:', error);
        alert(error.error?.message || 'An unexpected error occurred.');
      }
    );
  }
}

export class Login {
  emailId: string = '';
  password: string = '';
}

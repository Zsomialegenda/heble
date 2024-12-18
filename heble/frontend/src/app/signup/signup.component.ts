import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class SignupComponent {
  signupForm: FormGroup;
  message: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private signupService: UserService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.signupService.signup(this.signupForm.value).subscribe(
        (response: any) => {
          this.message = response.message;
          this.error = '';
        },
        (error: any) => {
          this.message = '';
          this.error = error.error?.message || 'An error occurred.';
        }
      );
    } else {
      this.error = 'Please fill out all fields correctly.';
    }
  }
}

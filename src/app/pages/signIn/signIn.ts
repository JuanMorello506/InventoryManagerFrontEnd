import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signIn.html',
  styleUrls: ['./signIn.css']
})
export class SignIn implements OnInit {
  message = '';
  isError = false;
  signUpForm!: FormGroup;

  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.signUpForm = this.fb.group({
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      Username: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }

  signIn() {
    
    if (this.signUpForm.invalid) {
      this.isError = true;
      this.message = 'Please fill in all required fields correctly.';
      return;
    }

    const credentials = this.signUpForm.value;

    this.authService.register(credentials).subscribe(result => {
      console.log('Register response:', result);
      if (result.success) {
        this.isError = false;
        this.message = result.message || 'Registration successful!';
        setTimeout(() => this.router.navigate(['dashboard']), 1000);
      } else {
        this.isError = true;
        this.message = result.message || 'Registration failed. Please try again.';
      }
    });
  }

  changeToLogIn() {
    this.router.navigate(['/logIn']);
  }
}

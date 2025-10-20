import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './logIn.html',
  styleUrls: ['./logIn.css']
})
export class LogIn implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm!: FormGroup;
  message = '';
  isError = false;

  ngOnInit() {
    this.loginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  logIn() {
    if (this.loginForm.invalid) {
      this.message = 'Please fill in all fields';
      this.isError = true;
      return;
    }

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe(result => {
      console.log('Login response:', result);
      if (result.success) {
        this.isError = false;
        this.message = 'Login successful';
        this.router.navigate(['dashboard']);
      } else {
        this.message = result.message || 'Login failed';
        this.isError = true;
      }
    });
  }

  changeToSignIn() {
    this.router.navigate(['/signIn']);
  }
}

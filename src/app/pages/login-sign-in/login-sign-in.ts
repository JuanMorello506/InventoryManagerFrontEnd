import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-sign-in.html',
  styleUrls: ['./login-sign-in.css']
})
export class LoginSignIn {
  private authService = inject(AuthService);
  private router = inject(Router);

  submit(event: Event) {
    event.preventDefault();

    this.authService.login();

    this.router.navigate(['dashboard']);
  }
}

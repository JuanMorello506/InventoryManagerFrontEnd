import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logIn.html',
  styleUrls: ['./logIn.css']
})
export class LogIn {
  private authService = inject(AuthService);
  private router = inject(Router);

  logIn(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const credentials = {
      username: formData.get('username') as string,
      password: formData.get('password') as string
    };

    this.authService.login(credentials).subscribe(success => {
      if (success) {
        this.router.navigate(['dashboard']);
      } else {
        // TODO: Handle login error
        console.error('Login failed');
        alert('Login failed');
      }
    });
  }

  changeToSignIn() {
    this.router.navigate(['/signIn']);
  }

  
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [],
  templateUrl: './signIn.html',
  styleUrls: ['./signIn.css']
})
export class SignIn {
  constructor(private authService: AuthService, private router: Router) {}
  
  signIn(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const credentials = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string
    };

    this.authService.register(credentials).subscribe(success => {
      if (success) {
        this.router.navigate(['dashboard']);
      } else {
        // Handle login error
      }
    });
  }

  changeToLogIn() {
    this.router.navigate(['/logIn']);
  }

}

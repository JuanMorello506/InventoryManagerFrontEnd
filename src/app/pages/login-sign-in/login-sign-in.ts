import { Component } from '@angular/core';
import { AppRoutingModule } from "../../app.routes";

@Component({
  selector: 'app-login-sign-in',
  standalone: true,
  imports: [AppRoutingModule],
  templateUrl: './login-sign-in.html',
  styleUrls: ['./login-sign-in.css']
})
export class LoginSignIn {

  isLoggedIn: boolean = false;

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { Auth2Service } from 'src/app/Services/auth2.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = {
    email: null,
    password: null
  };
  error = null;
  onSubmit() {
    return this.auth.login(this.form)
      .subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
  }
  handleError(error) {
    this.error = error.error.error;
  }
  constructor(
    private auth: AuthService,
    private token: TokenService,
    private router: Router,
    private auth2: Auth2Service
  ) { }

  handleResponse(data) {
    this.token.handle(data.access_token);
    this.auth2.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  ngOnInit() {
  }

}

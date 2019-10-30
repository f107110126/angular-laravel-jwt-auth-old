import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = {
    email: null,
    password: null
  }
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
    private token: TokenService
  ) { }

  handleResponse(data) {
    this.token.handle(data.access_token);
  }

  ngOnInit() {
  }

}

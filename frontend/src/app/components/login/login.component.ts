import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null
  };
  public error = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {
    let url = 'http://127.0.0.1:8000/api/auth/login';
    this.http.post(url, this.form).subscribe(console.log, error=>this.handleError(error));
  }

  handleError(error) {
    this.error = error.error.message;
    console.log(this.error);
  }
}

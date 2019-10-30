import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  form = {
    emal: null,
    name: null,
    password: null,
    password_confirmation: null
  }
  errors = {
    message:null,
    errors:{
      name:null,
      email:null,
      password:null
    }
  };
  onSubmit() {
    return this.auth.signup(this.form).subscribe(
      data => console.log(data),
      error => this.handleError(error)
    );
  }
  handleError(error) { this.errors = error.error; console.log(this.errors) }
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}

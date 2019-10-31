import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  error = {};
  form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  }
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {
    route.queryParams.subscribe(params => this.form.resetToken = params['token'])
  }

  onSubmit() {
    this.auth.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.router.navigateByUrl('/login');
  }

  handleError(error) {
    this.error = error.error.errors;
    console.log(this.error);
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Snotify, SnotifyService } from 'ng-snotify';

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
    private router: Router,
    private notify: SnotifyService
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
    let _router = this.router;
    this.notify.confirm('Done! Now login with new Password.',{
      buttons:[
        {
          text: 'Okay', action: toster =>{
            _router.navigateByUrl('/login'),
            this.notify.remove(toster.id)
          }
        }
      ]
    });
  }

  handleError(error) {
    this.error = error.error.errors;
    console.log(this.error);
  }

  ngOnInit() {
  }

}

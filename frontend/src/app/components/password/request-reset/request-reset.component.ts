import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
  form = {
    email: null,
  };
  onSubmit() {
    this.notify.info('Wait...', {
      timeout: 5000
    })
    this.auth.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    );
  }
  handleResponse(res) {
    this.notify.success(res.data, { timeout: 0 })
    this.form.email = null;

  }
  constructor(
    private auth: AuthService,
    private notify: SnotifyService
  ) { }

  ngOnInit() {
  }

}

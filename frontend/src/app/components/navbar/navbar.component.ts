import { Component, OnInit } from '@angular/core';
import { Auth2Service } from 'src/app/Services/auth2.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean;

  constructor(
    private auth2: Auth2Service,
    private router: Router,
    private token: TokenService
  ) { }

  ngOnInit() {
    this.auth2.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.token.remove();
    this.auth2.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';

import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { AuthService } from './Services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SingupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule
  ],
  providers: [
    AuthService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

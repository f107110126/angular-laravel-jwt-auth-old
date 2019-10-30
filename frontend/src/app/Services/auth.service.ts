import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'http://127.0.0.1:8000/api/auth';
  constructor(private http: HttpClient) { }

  signup(data) {
    return this.http.post(this.baseURL + '/signup', data);
  }

  login(data) {
    return this.http.post(this.baseURL + '/login', data);
  }
}

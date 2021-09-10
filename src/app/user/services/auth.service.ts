import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
// import { baseUrl } from 'src/environments/environment';
import { environment } from 'src/environments/environment';
import { LoginData, RegisterData } from '../model/auth.model';
import { User } from '../model/user.model';

export const AUTH_TOKEN_KEY = 'auth-token';
export const AUTH_USER_DATA = 'user-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = environment.baseUrl;
  public autToken: string | null = null; // to store the user token
  public userData: User | null = null; // store the user data
  user: any;

  constructor(private http: HttpClient, private router: Router) {}

  // to post user data to api
  registerUser(userData: RegisterData) {
    return this.http.post(this.api + 'register', userData);
  }

  // to post auth data(user email and passowrd) to api
  login(authData: User): Observable<any> {
    return this.http.post(this.api + 'login', authData);
  }

  // creating fake token for user
  setStorage(authData: User) {
    localStorage.setItem(AUTH_TOKEN_KEY, authData.email + 'RANDOM_STRING');
    localStorage.setItem(AUTH_USER_DATA, JSON.stringify(authData));
    console.log(localStorage);
    this.checkStorage();
  }

  // to check if token is created
  checkStorage() {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    const userData = localStorage.getItem(AUTH_USER_DATA);
    this.autToken = authToken;
    if (userData) {
      this.userData = JSON.parse(userData) as any;
    } else {
      this.userData = null;
    }
  }

  // to check if user token is logged in
  public isLoggedIn() {
    // console.log(this.autToken);
    return this.autToken !== null;
  }

  //clear the user token
  public logout() {
    if (!this.isLoggedIn()) return;
    localStorage.clear();
    this.checkStorage();
  }
}

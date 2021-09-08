import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { baseUrl } from 'src/environments/environment';
import { LoginData, RegisterData } from '../model/auth.model';
import { User } from '../model/user.model';

export const AUTH_TOKEN_KEY = 'auth-token';
export const AUTH_USER_DATA = 'user-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user: BehaviorSubject<User> = new BehaviorSubject(null);
  public autToken: string | null = null;
  public userData: User | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.checkStorage();
  }

  registerUser(authData: User) {
    // sessionStorage.setItem(AUTH_TOKEN_KEY, authData.email + 'RANDOM_STRING')
    // return this.http.post(`${baseUrl}user`, authData);
    this.router.navigate(['/']);
  }

  login(authData: User): Observable<any> {
    localStorage.setItem(AUTH_TOKEN_KEY, authData.email + 'RANDOM_STRING');
    localStorage.setItem(AUTH_USER_DATA, JSON.stringify(authData));
    console.log(localStorage);
    this.checkStorage();
    return this.http.post(`${baseUrl}user`, authData);
  }

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

  public isLoggedIn() {
    console.log(this.autToken);
    return this.autToken !== null;
  }

  public logout() {
    if (!this.isLoggedIn()) return;
    localStorage.clear();
    this.checkStorage();
  }
}

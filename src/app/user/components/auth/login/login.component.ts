import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { RegisterData } from 'src/app/user/model/auth.model';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false; // to show/hide loader
  error: string = '';
  hide = true;
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  //submit Login data and set the token
  onSubmit(form: NgForm) {
    this.isLoading = true; // show the loader after login form submit
    let userData = { email: form.value.email, password: form.value.password };
    this.authService.checkUser().subscribe(
      (res) => {
        this.isLoading = false;
        let users: any;
        console.log(res);
        users = res;
        users.forEach((element, index) => {
          if (
            element.email === userData.email &&
            element.password === userData.password
          ) {
            console.log('one time' + element.firstName);
            this.user.firstName = element.firstName;
            this.user.lastName = element.lastName;
            this.user.email = element.email;
            this.user.password = element.password;
            this.user.dob = element.dob;
            this.user.phoneNumber = element.phoneNumber;
            this.user.role = element.role;
            this.user.id = element.id;
            this.login(this.user);
            return;
          } else {
            this.isLoading = false;
            this.error = 'Invalid useremail or password';
          }
        });
      },
      (err) => {
        this.error = err.message;
        this.isLoading = false;
      }
    );
  }

  login(user: any) {
    this.isLoading = true; // show the loader after login form submit
    this.authService.login(user);
    if (this.authService.autToken) {
      this.router.navigate(['/dashboard/patient-dashboard']);
      this.isLoading = false; //hide the loader after request happens
    }
  }
  // onSubmit(form: NgForm) {
  //   this.isLoading = true; // show the loader after registrion form submit
  //   let userData = { email: form.value.email, password: form.value.password };
  //   this.authService.setStorage(userData);
  // }
}

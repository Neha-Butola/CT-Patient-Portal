import { Component, OnInit } from '@angular/core';
import { EmailValidator, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
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

  // submit Login data and set the token
  onSubmit(form: NgForm) {
    this.isLoading = true; // show the loader after registrion form submit
    let userData = { email: form.value.email, password: form.value.password };
    // to check if user and password correct
    this.authService.checkUser(userData).subscribe(
      (res) => {
        //to get the logged in useer data
        this.authService.login().subscribe((res) => {
          console.log('result is' + res);
          let users = res;
          users.forEach((element) => {
            if (userData.email == element.email) {
              this.user = element;
              console.log(this.user);
              this.authService.setStorage(this.user);
            }
          });
          this.router.navigate(['/dashboard/patient-dashboard']);
          this.isLoading = false; //hide the loader after request happens
        });
      },
      (err) => {
        console.log(err);
        this.error = err.error;
        this.isLoading = false; //hide the loader after request fails
      }
    );
  }
}

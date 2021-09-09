import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error: string = '';
  hide = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  //Login Submit and Authenticate
  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.authService
      .login({ email: form.value.email, password: form.value.password })
      .subscribe(
        (res) => {
          console.log(res);
          this.isLoading = false;
          this.router.navigate(['/dashboard/patient-dashboard']);
        },
        (errMessage) => {
          console.log(errMessage);
          this.error = errMessage;
          this.isLoading = false;
        }
      );
  }
}

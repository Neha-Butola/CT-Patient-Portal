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
  isLoading = false; // to show/hide loader
  error: string = '';
  hide = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  //submit Login data and set the token
  // onSubmit(form: NgForm) {
  //   this.isLoading = true; // show the loader after registrion form submit
  //   let userData = { email: form.value.email, password: form.value.password };
  //   this.authService.login(userData).subscribe(
  //     (res) => {
  //       this.router.navigate(['/dashboard/patient-dashboard']);
  //       this.isLoading = false; //hide the loader after request happens
  //       this.authService.setStorage(userData);
  //       console.log('result is' + res);
  //     },
  //     (err) => {
  //       console.log(err);
  //       this.error = err.message;
  //       this.isLoading = false; //hide the loader after request fails
  //     }
  //   );
  // }
  onSubmit(form: NgForm) {
    this.isLoading = true; // show the loader after registrion form submit
    let userData = { email: form.value.email, password: form.value.password };
    this.authService.setStorage(userData);
  }
}

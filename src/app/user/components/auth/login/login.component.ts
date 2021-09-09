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

  onSubmit(form: NgForm) {
    this.isLoading = true;
    let userData = { email: form.value.email, password: form.value.password };
    this.authService.login(userData).subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/dashboard/patient-dashboard']);
        this.authService.setStorage(userData);
      },
      (err) => {
        console.log(err);
        this.error = err.message;
        this.isLoading = false;
      }
    );
  }
}

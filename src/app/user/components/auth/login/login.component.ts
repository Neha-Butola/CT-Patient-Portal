import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  AuthResponseData,
  AuthService,
} from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error: string = null;
  authObs: Observable<AuthResponseData>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password).subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
      },
      (errMessage) => {
        console.log(errMessage);
        this.error = errMessage;
        this.isLoading = false;
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterData } from 'src/app/user/model/auth.model';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  register: RegisterData = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
    dob: new Date(),
    phoneNo: 0,
  };

  isLoading = false;
  error: string = null;

  constructor(private authServive: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.authServive
      .registerUser(this.register.email, this.register.password)
      .subscribe(
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

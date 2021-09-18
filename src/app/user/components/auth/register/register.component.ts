import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterData } from 'src/app/user/model/auth.model';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false; // to show/hide loader
  error: string = '';
  hide = true;

  roles: string[] = ['Patient', 'Physician', 'Admin'];

  constructor(
    private fb: FormBuilder,
    private authServive: AuthService,
    private router: Router
  ) {}
  maxDate: any;
  minDate: any;

  ngOnInit(): void {
    this.initForm();
    this.setDOBVal();
  }

  //initialize registration form and set validations
  initForm() {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        // validates date format yyyy-mm-dd
        dob: ['', [Validators.required]],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.pattern('^[0-9]+$'),
          ],
        ],
        role: ['', Validators.required],
      }
      // {
      //     validator: MustMatch('password', 'confirmPassword')
      // }
    );
  }

  // to return form control
  get f() {
    return this.registerForm.controls;
  }

  // to submit registration data and get the response data or error
  onSubmit() {
    this.isLoading = true; // show the loader after registrion form submit
    this.authServive.checkUser().subscribe(
      (res) => {
        this.isLoading = false;
        console.log(res);
        let users;
        users = res;
        if (users.find((x) => x.email === this.registerForm.value.email)) {
          this.error = 'useremail is already taken';
        } else {
          this.register();
        }
      },
      (err) => {
        console.log(err);
        this.error = err.message;
        this.isLoading = false; //hide the loader after request fails
      }
    );
  }

  register() {
    this.authServive.registerUser(this.registerForm.value).subscribe(
      (res) => {
        this.isLoading = false; //hide the loader after request happens
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err);
        this.error = err.message;
        this.isLoading = false; //hide the loader after request fails
      }
    );
  }

  //to set max and min values for date of birth.
  setDOBVal() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 200);
  }
}

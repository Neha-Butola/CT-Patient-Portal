import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { RegisterData } from 'src/app/user/model/auth.model';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  error: string = '';
  hide = true;

  roles: string[] = ['Patient', 'Physician', 'Admin'];

  constructor(private fb: FormBuilder, private authServive: AuthService) {}
  maxDate: any;
  minDate: any;

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 200);
    this.initForm();
  }

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
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.authServive.registerUser(this.registerForm.value);
  }
}

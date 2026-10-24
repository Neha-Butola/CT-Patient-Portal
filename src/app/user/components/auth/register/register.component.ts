import {
  Component,
  OnDestroy,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from 'src/app/shared/validations/confirm-password.validator';
import { RegisterData } from 'src/app/user/model/auth.model';
import { AuthService } from 'src/app/user/services/auth.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false; // to show/hide loader
  isSuccess = false;
  error: string = '';
  hide = true;
  registeredUser: RegisterData;
  roles: string[] = ['Patient', 'Physician'];
  authSubscription: Subscription;
  maxDate: any;
  minDate: any;
  userRole: string;

  profiles: string[] = [
    'Radiologist',
    'Cardiologist',
    'Psychiatrist',
    'Internist',
    'Neurologist',
  ];

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  constructor(
    private fb: FormBuilder,
    private authServive: AuthService,
    private router: Router,
    public cfResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setProfileValidators();
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
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ],
        ],
        role: ['', Validators.required],
        profile: [''],
      },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  // to return form control
  get f() {
    return this.registerForm.controls;
  }

  //to set max and min values for date of birth.
  setDOBVal() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 200);
  }

  // set profile validations
  setProfileValidators() {
    const profileControl = this.registerForm.get('profile');
    this.registerForm.get('role').valueChanges.subscribe((role) => {
      if (role === 'Physician') {
        profileControl.setValidators([Validators.required]);
      }
    });
  }

  // to submit registration data and get the response data or error
  onSubmit() {
    this.isLoading = true; // show the loader after registrion form submit
    this.authSubscription = this.authServive
      .registerUser(this.registerForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false; //hide the loader after request happens
        })
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.showAlert('You are Registered Successfully');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        },
        (err) => {
          console.log(err);
          this.error = err.error;
          this.isLoading = false; //hide the loader after request fails
        }
      );
  }
  // to show alert when user regiterd successfully
  private showAlert(message: string) {
    const alertCmpFactory = this.cfResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContRef = this.alertHost.viewContainerRef;
    hostViewContRef.clear();

    const compRef = hostViewContRef.createComponent(alertCmpFactory);

    compRef.instance.message = message;
    compRef.instance.isSuccess = true;
    setTimeout(() => {
      console.log('clear');
      hostViewContRef.clear();
    }, 1000);
  }
}

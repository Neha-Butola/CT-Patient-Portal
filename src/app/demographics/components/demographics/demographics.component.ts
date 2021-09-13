import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  NgForm,
  AbstractControl,
  FormGroupDirective,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/services/auth.service';
import { Demographics } from '../../model/demographics';
import { DemographicsService } from '../../services/demographics.service';

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.scss'],
})
export class DemographicsComponent implements OnInit {
  // alert: boolean = false;
  userData: any;
  isEdit: boolean = true;
  demographics: Demographics;

  errors: any = {};
  demoForm: FormGroup;
  firstname: string = '';
  lastname: string = '';

  constructor(
    private formbuilder: FormBuilder,
    private demographicsService: DemographicsService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}
  createForm(demographics?: Demographics) {
    this.demoForm = this.formbuilder.group({
      firstname: new FormControl(demographics?.firstname || '', [
        Validators.required,
        Validators.minLength(5),
      ]),
      lastname: new FormControl(demographics?.lastname || '', [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      dob: new FormControl(demographics?.dob || '', [Validators.required]),
      gender: new FormControl(demographics?.gender || '', [
        Validators.required,
      ]),
      ethnicity: new FormControl(demographics?.ethnicity || '', [
        Validators.required,
      ]),
      education: new FormControl(demographics?.education || '', [
        Validators.required,
      ]),
      occupation: new FormControl(demographics?.occupation || '', [
        Validators.required,
      ]),
      address: new FormControl(demographics?.address || '', [
        Validators.required,
      ]),
      phone: new FormControl(demographics?.phone || '', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      medical: new FormControl(demographics?.medical || '', [
        Validators.required,
      ]),
      familymedical: new FormControl(demographics?.familymedical || '', [
        Validators.required,
      ]),
      surgeries: new FormControl(demographics?.surgeries || '', [
        Validators.required,
      ]),
      insurance: new FormControl(demographics?.insurance || '', [
        Validators.required,
      ]),
    });
  }
  //demo form key fetch for error message
  getControl(key: string): AbstractControl | null {
    return this.demoForm.get(key);
  }

  //only number will be add
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  //demographics form submit after validation
  onSubmit(formData: any, formDirective: FormGroupDirective): void {
    // TODO: Use EventEmitter with form value
    //console.log(this.demoForm.value);
    if (this.demoForm.valid) {
      if (this.demographics) {
        this.demographicsService
          .updateDemography(this.demoForm.value, this.demographics.id)
          .subscribe(
            (res: any) => {
              this.demographics = { ...this.demoForm.value, id: res.id };
              this.isEdit = false;
              this.snackBar.open('Your data updated successfully.', 'cancel');
            },
            (err: any) => {
              console.log(JSON.stringify(err));
              this.errors = err.error;
            }
          );
      } else {
        this.demographicsService.saveDemography(this.demoForm.value).subscribe(
          (res: any) => {
            this.demographics = { ...this.demoForm.value, id: res.id };
            this.isEdit = false;
            this.snackBar.open('Your data added successfully.', 'cancel');
          },
          (err: any) => {
            console.log(JSON.stringify(err));
            this.errors = err.error;
          }
        );
      }
    } else {
      this.demoForm.markAsTouched();
    }
  }

  // closeAlert() {
  //   this.alert = false;
  // }

  //dob validation
  maxDate: any;
  minDate: any;
  ngOnInit(): void {
    // this.userData = this.authService.getUserData();
    // if(this.userData) {
    this.demographicsService.getDemography(6).subscribe(
      (res) => {
        this.demographics = res;
        if (this.demographics) {
          this.isEdit = false;
        }
        this.createForm(this.demographics);
      },
      (err) => {
        this.createForm();
      }
    );
    //}
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 200);
  }

  // editData() {
  //   this.demographicsService
  //     .putDemography(this.demographics.id)
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }

  delete() {
    this.demographicsService
      .deleteDemography(this.demographics.id)
      .subscribe((res) => {
        this.demographics = null;
        this.isEdit = true;
        this.demoForm.reset();
      });
  }
}

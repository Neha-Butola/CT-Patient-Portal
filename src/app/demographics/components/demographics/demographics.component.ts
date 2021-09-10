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
import { Router } from '@angular/router';
import { Demographics } from '../../model/demographics';
import { DemographicsService } from '../../services/demographics.service';

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.scss'],
})
export class DemographicsComponent implements OnInit {
  // demographics: Demographics = {
  //   address: '',
  //   education: '',
  //   ethnicity: '',
  //   familymedical: '',
  //   firstname: '',
  //   gender: '',
  //   insurance: '',
  //   lastname: '',
  //   medical: '',
  //   occupation: '',
  //   phone: '',
  // };

  errors: any = {};
  demoForm: FormGroup;
  firstname: string = '';
  lastname: string = '';

  constructor(
    private formbuilder: FormBuilder,
    private demographicsService: DemographicsService,
    private router: Router
  ) {
    this.demoForm = formbuilder.group({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      ethnicity: new FormControl('', [Validators.required]),
      education: new FormControl('', [Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),

      medical: new FormControl('', [Validators.required]),
      familymedical: new FormControl('', [Validators.required]),
      surgeries: new FormControl('', [Validators.required]),
      insurance: new FormControl('', [Validators.required]),
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
      this.demographicsService.saveDemography(this.demoForm.value).subscribe(
        (res: any) => {
          formDirective.resetForm();
          this.demoForm.reset();
          // console.log(JSON.stringify(res));
        },
        (err: any) => {
          console.log(JSON.stringify(err));
          this.errors = err.error;
        }
      );
    } else {
      //this.demoForm.reset();
      this.demoForm.markAsTouched();
    }
  }
  //dob validation
  maxDate: any;
  minDate: any;
  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 200);
  }
}

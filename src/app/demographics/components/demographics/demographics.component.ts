import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  NgForm,
} from '@angular/forms';
import { Router } from '@angular/router';
//import { Demographics } from '../../model/demographics';
import { DemographicsService } from '../../services/demographics.service';

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.scss'],
})
export class DemographicsComponent implements OnInit {
  /*demographics: Demographics = {
    address: '',
    education: '',
    ethnicity: '',
    familymedical: '',
    firstname: '',
    gender: '',
    insurance: '',
    lastname: '',
    medical: '',
    occupation: '',
    phone: '',
  };*/
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
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
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

  //only number will be add
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.demoForm.value);
    /*this.demographicsService.getDemography().subscribe(
      (res) => {
        console.log(JSON.stringify(res));
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.errors = err.error;
      }
    );*/
  }

  ngOnInit(): void {}
}

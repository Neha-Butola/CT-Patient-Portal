import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Immunization } from '../../model/immunization';
import { ImmDetailsService } from '../../services/imm-details.service';
@Component({
  selector: 'app-immunization-covid',
  templateUrl: './immunization-covid.component.html',
  styleUrls: ['./immunization-covid.component.scss'],
  providers: [DatePipe],
})
export class ImmunizationCovidComponent implements OnInit {
  errors: any = {};
  immForm: FormGroup;
  immunizationForm: FormGroup;
  isEdit: boolean = true;
  issecondEdit: boolean = true;
  immunization: Immunization;
  isLinear = true;
  isCompleted: boolean = false;
  maxDate: Date;
  minDate: Date;
  constructor(
    private formbuilder: FormBuilder,
    private ImmDetailsService: ImmDetailsService,
    private snackBar: MatSnackBar
  ) {
    this.maxDate = new Date();
    this.minDate = new Date();
  }

  //field validation
  createForm(immunization?: Immunization) {
    this.immForm = this.formbuilder.group({
      vaccinename: new FormControl(immunization?.vaccinename || '', [
        Validators.required,
      ]),
      vaccinetype: new FormControl(immunization?.vaccinetype || ''),
      date: new FormControl(immunization?.date || '', [Validators.required]),
      doses1: new FormControl(immunization?.doses1 || '', [
        Validators.required,
      ]),
    });
    this.immunizationForm = this.formbuilder.group({
      date1: new FormControl(immunization?.date1 || '', [Validators.required]),
      doses2: new FormControl(immunization?.doses2 || '', [
        Validators.required,
      ]),
    });
  }
  //validation for mat-step1
  isNameValid() {
    return this.immForm.pristine || this.immForm.valid;
  }
  //validation for mat-step2
  issecondValid() {
    return this.immunizationForm.pristine || this.immunizationForm.valid;
  }
  //alert message when go to another form without submit
  changeEvent(e) {
    if (e.selectedIndex == 1 && this.isCompleted == false) {
      this.snackBar.open('Please fill the first form', 'cancel');
    }
    if (e.selectedIndex == 2 && this.isCompleted == false) {
      this.snackBar.open('Please fill the second form', 'cancel');
    }
  }
  //first form for submit method
  onSubmit(formData: any, formDirective: FormGroupDirective): void {
    if (this.immForm.valid) {
      if (this.immForm.value.date != 'undefined') {
        this.ImmDetailsService.submitImmunization(this.immForm.value).subscribe(
          (res: any) => {
            this.isCompleted = true;
            this.immunization = { ...this.immForm.value };
            this.isEdit = false;
            this.snackBar.open(
              'Your first vaccination successfully.',
              'cancel'
            );
          },
          (err: any) => {
            console.log(JSON.stringify(err));
            this.errors = err.error;
          }
        );
      }
    }
  }
  //second form for submit method
  onformSubmit(formData: any, formsecondDirective: FormGroupDirective): void {
    if (this.immunizationForm.valid) {
      var date = this.immForm.value.date.toLocaleDateString();
      var b = new Date(date);
      var date2 = new Date(b.getTime() + 45 * 24 * 60 * 60 * 1000);
      if (this.immunizationForm.value.date1 >= date2) {
        this.ImmDetailsService.submitImmunization(
          this.immunizationForm.value
        ).subscribe((res: any) => {
          this.isCompleted = true;
          this.immunization = {
            ...this.immForm.value,
            ...this.immunizationForm.value,
          };
          this.issecondEdit = false;

          this.snackBar.open('Your second vaccination successfully.', 'cancel');
        });
        (err: any) => {
          console.log(JSON.stringify(err));
          this.errors = err.error;
        };
      } else {
        this.snackBar.open('Your next due date after 45 days', 'cancel');
      }
    }
  }

  ngOnInit(): void {
    if ((this.isEdit = true)) {
      this.createForm();
    }
  }
}

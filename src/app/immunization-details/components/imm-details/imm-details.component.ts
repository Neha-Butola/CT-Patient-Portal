import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Immunization } from '../../model/immunization';
import { ImmDetailsService } from '../../services/imm-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-imm-details',
  templateUrl: './imm-details.component.html',
  styleUrls: ['./imm-details.component.scss'],
  providers: [DatePipe],
})
export class ImmDetailsComponent implements OnInit {
  errors: any = {};
  immForm: FormGroup;
  immunizationForm: FormGroup;
  isEdit: boolean = true;
  issecondEdit: boolean = true;
  immunization: Immunization;
  isDisabled: boolean = true;
  isLinear = false;
  isAbcChecked = true;

  myDate = new Date();
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private ImmDetailsService: ImmDetailsService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {}
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
      vaccinename: new FormControl(immunization?.vaccinename || ''),
      vaccinetype: new FormControl(immunization?.vaccinetype || ''),
      date: new FormControl(immunization?.date || ''),
      doses1: new FormControl(immunization?.doses1 || ''),
      date1: new FormControl(immunization?.date1 || '', [Validators.required]),
      doses2: new FormControl(immunization?.doses2 || '', [
        Validators.required,
      ]),
    });
  }

  onSubmit(formData: any, formDirective: FormGroupDirective): void {
    if (this.immForm.valid) {
      if (this.immForm.value.date != 'undefined') {
        this.ImmDetailsService.submitImmunization(this.immForm.value).subscribe(
          (res: any) => {
            this.immunization = { ...this.immForm.value };
            this.isEdit = false;
            console.log('first form');
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
  onformSubmit(formData: any, formsecondDirective: FormGroupDirective): void {
    if (this.immunizationForm.valid) {
      var date = this.immForm.value.date.toLocaleDateString();
      var b = new Date(date);
      var date2 = new Date(b.getTime() + 45 * 24 * 60 * 60 * 1000);
      if (this.immunizationForm.value.date1 >= date2) {
        this.ImmDetailsService.submitImmunization(
          this.immunizationForm.value
        ).subscribe((res: any) => {
          this.immunization = { ...this.immunizationForm.value };
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
    if ((this.issecondEdit = true)) {
      this.createForm();
    }
  }
}
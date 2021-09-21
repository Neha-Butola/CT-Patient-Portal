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
@Component({
  selector: 'app-imm-details',
  templateUrl: './imm-details.component.html',
  styleUrls: ['./imm-details.component.scss'],
})
export class ImmDetailsComponent implements OnInit {
  errors: any = {};
  immForm: FormGroup;
  isEdit: boolean = true;
  immunization: Immunization;
  isDisabled: boolean = true;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private ImmDetailsService: ImmDetailsService,
    private snackBar: MatSnackBar
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
      doses2: new FormControl(immunization?.doses2 || { isDisabled: true }),
      date1: new FormControl(this.immunization?.date1 || ''),
    });
  }

  enableDate = () => {
    console.log('hello');
    this.immForm.get('doses2').enable();
    this.immForm.get('date1').enable();
    this.myFilter;
    this.immunization = { ...this.immForm.value };
    this.isEdit = false;
    this.snackBar.open('Your second vaccination successfully', 'cancel');
  };
  myFilter = () => {
    // Prevent Saturday and Sunday from being selected.
    var myDate = new Date(new Date().getTime() + 45 * 24 * 60 * 60 * 1000);
    myDate;
  };
  onSubmit(formData: any, formDirective: FormGroupDirective): void {
    if (this.immForm.valid) {
      if (
        this.immForm.value.date != 'undefined' &&
        this.immForm.value.date1 === ''
      ) {
        this.ImmDetailsService.submitImmunization(this.immForm.value).subscribe(
          (res: any) => {
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
      } else {
        this.ImmDetailsService.submitImmunization(this.immForm.value).subscribe(
          (res: any) => {
            this.immunization = { ...this.immForm.value };
            this.isEdit = false;
            this.snackBar.open(
              'Your second vaccination successfully.',
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

  ngOnInit(): void {
    if ((this.isEdit = true)) {
      // this.demographics = null;
      this.createForm();
    }
  }
}

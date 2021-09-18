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
      vaccinetype: new FormControl(immunization?.vaccinetype || '', [
        Validators.required,
      ]),
      date: new FormControl(immunization?.date || '', [Validators.required]),
      doses1: new FormControl(immunization?.doses1 || '', Validators.required),
      doses2: new FormControl(
        immunization?.doses2 || { value: '', disabled: true }
      ),
      date1: new FormControl(
        immunization?.date1 || { value: '', disabled: true }
      ),
    });
  }
  myFilter = () => {
    // Prevent Saturday and Sunday from being selected.
    let first = this.immForm.value.date;

    first = new Date(first.date);
    console.log(first);
  };
  onSubmit(formData: any, formDirective: FormGroupDirective): void {
    if (this.immForm.valid) {
      this.ImmDetailsService.submitImmunization(this.immForm.value).subscribe(
        (res: any) => {
          if (
            this.immForm.value.date != 'undefined' &&
            this.immForm.value.doses1 === true
          ) {
            console.log('hello');
            this.immForm.get('doses2').enable();
            this.immForm.get('date1').enable();
            this.myFilter;
            this.immunization = { ...this.immForm.value };
            this.isEdit = false;
            this.snackBar.open(
              'Your first vaccination successfully.',
              'cancel'
            );
          } else {
            this.immForm.reset();
          }
          if (
            this.immForm.value.date1 != 'undefined' &&
            this.immForm.value.doses2 === true
          ) {
            this.immunization = { ...this.immForm.value };
            this.isEdit = false;
            this.snackBar.open(
              'Your second vaccination successfully',
              'cancel'
            );
          }
        },
        (err: any) => {
          console.log(JSON.stringify(err));
          this.errors = err.error;
        }
      );
      console.log(this.immForm.value);
    }
  }

  ngOnInit(): void {
    if ((this.isEdit = true)) {
      // this.demographics = null;
      this.createForm();
    } else {
      this.ImmDetailsService.getImmunization(4).subscribe(
        (res) => {
          this.immunization = res;
          if (this.immunization) {
            this.isEdit = false;
          }
          this.createForm(this.immunization);
        },
        (err) => {
          this.createForm();
        }
      );
    }
  }
}

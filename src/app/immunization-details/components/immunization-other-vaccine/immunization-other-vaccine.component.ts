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
import { ImmDetailsService } from '../../services/imm-details.service';
import { Immunization } from '../../model/immunization';
@Component({
  selector: 'app-immunization-other-vaccine',
  templateUrl: './immunization-other-vaccine.component.html',
  styleUrls: ['./immunization-other-vaccine.component.scss'],
  providers: [DatePipe],
})
export class ImmunizationOtherVaccineComponent implements OnInit {
  errors: any = {};
  immForm: FormGroup;
  isEdit: boolean = true;
  immunization: Immunization;
  isDisabled: boolean = true;
  isLinear = true;
  isCompleted: boolean = false;
  myDate = new Date();

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private ImmDetailsService: ImmDetailsService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {}

  //field validation
  createForm(immunization?: Immunization) {
    this.immForm = this.formbuilder.group({
      vaccinetype: new FormControl(immunization?.vaccinetype || ''),
    });
  }
  //validation for mat-step1
  isNameValid() {
    return this.immForm.pristine || this.immForm.valid;
  }
  //alert message when go to another form without submit
  changeEvent(e) {
    if (e.selectedIndex == 1 && this.isCompleted == false) {
      this.snackBar.open('Please fill the other vaccine form', 'cancel');
    }
  }
  //other vaccine form for submit method
  onSubmit(formData: any, formDirective: FormGroupDirective): void {
    if (this.immForm.valid) {
      this.ImmDetailsService.submitotherImm(this.immForm.value).subscribe(
        (res: any) => {
          this.isCompleted = true;
          this.immunization = { ...this.immForm.value };
          this.isEdit = false;
          this.snackBar.open('Your other vaccination successfully.', 'cancel');
        },
        (err: any) => {
          console.log(JSON.stringify(err));
          this.errors = err.error;
        }
      );
    }
  }

  ngOnInit(): void {
    if ((this.isEdit = true)) {
      this.createForm();
    }
  }
}

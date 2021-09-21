import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface Tests {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  form: FormGroup;
  tests: Tests[] = [
    { value: 'Compete Bloob Count', viewValue: 'Compete Bloob Count' },
    { value: 'Lipid Profile', viewValue: 'Lipid Profile' },
    { value: 'Vitamin D Total Level', viewValue: 'Vitamin D Total Level' },
    { value: 'Vitamin B12', viewValue: 'Vitamin B12' },
    { value: 'Kidney Function Test', viewValue: 'Kidney Function Test' },
    { value: 'Liver Function Test', viewValue: 'Liver Function Test' },
    {
      value: 'Covid - Antibody Test',
      viewValue: 'Covid - Antibody Test',
    },
    { value: 'Covid - RT PCR(Not RT PCR)', viewValue: 'Covid - RT PCR' },
  ];

  testControl = new FormControl(this.tests[2].value);

  constructor() {
    this.form = new FormGroup({
      test: this.testControl,
    });
  }

  ngOnInit(): void {}
}

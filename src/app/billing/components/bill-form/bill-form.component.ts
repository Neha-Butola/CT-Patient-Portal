import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Billing } from '../../model/billing';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss'],
})
export class BillFormComponent implements OnInit {
  billForm: FormGroup;
  billing: Billing;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.billForm = this.fb.group({
      billNo: ['', Validators.required],
      title: ['', Validators.required],
      physician: ['', Validators.required],
      billDate: ['', Validators.required],
      consultation: ['', Validators.required],
    });
  }

  conformBill() {}
}

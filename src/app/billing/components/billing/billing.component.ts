import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Billing } from '../../model/billing';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  displayedColumns: string[] = [
    'billNo',
    'title',
    'physician',
    'billDate',
    'consultation',
  ];
  billingDetails: Billing[] = [];
  dataSource = new MatTableDataSource<any>(this.billingDetails);

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToPayment() {
    this.router.navigate(['/billing/billform']);
  }
}

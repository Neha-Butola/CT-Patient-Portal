import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Billing } from '../../model/billing';
import { BillingService } from '../../service/billing.service';
import { PaymentMethodComponent } from '../payment-method/payment-method.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'appointment',
    'physician',
    'billingDate',
    'consultationFee',
    'paymentMethod',
    'status',
  ];
  billingDetails: Billing[] = [];
  dataSource = new MatTableDataSource<any>(this.billingDetails);
  error: any;

  constructor(
    private router: Router,
    public dialogRef: MatDialog,
    private billingService: BillingService
  ) {}

  ngOnInit(): void {
    this.billingService.getBillingData().subscribe(
      (res: any) => {
        console.log(res);
        this.billingDetails = res?.filter((x) => x.paymentMethod);
        this.dataSource.data = this.billingDetails;
      },
      (err: any) => {
        this.error = err.error;
      }
    );
  }

  goToPayment() {
    this.router.navigate(['/billing/billform']);
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateAppointmentComponent } from 'src/app/appointment/schedule-appointment/modals/create-appointment/create-appointment.component';
import { AppointmentService } from 'src/app/appointment/services/appointment.service';
import { BillingService } from '../../service/billing.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit {
  paymentForm: FormGroup;
  error: string;
  selectedStatus: any;
  strikeCheckout: any = null;

  constructor(
    public dialogRef: MatDialogRef<CreateAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private billingService: BillingService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.stripePaymentGateway();
    this.paymentForm = this.fb.group({
      paymentMethod: [],
    });
  }
  pay() {
    this.billingService
      .updateBill(
        {
          ...this.data,
          paymentMethod: this.paymentForm.value.paymentMethod,
          billingDate: new Date(),
        },
        this.data.id
      )
      .subscribe(
        (res: any) => {
          this.dialogRef.close();
          this.router.navigate(['/billing']);
          this.snackBar.open('Payment Successful!', 'cancel');
        },
        (err: any) => {
          this.error = err.error;
        }
      );
  }
  checkout(amount) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JeLPZSD2FoV2PUgJFwssb09KZhBNvUyRkKAYVqHJVolEthI9WcpqVYL6TVhsBRboR6qUGXFHzgHaUAHpa2sUL6R00L30koTEh',
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log(stripeToken);
        this.pay();
      },
    });

    strikeCheckout.open({
      name: 'RemoteStack',
      description: 'Payment widgets',
      amount: amount * 100,
    });
  }

  stripePaymentGateway() {
    if (!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement('script');
      scr.id = 'stripe-script';
      scr.type = 'text/javascript';
      scr.src = 'https://checkout.stripe.com/checkout.js';

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JeLPZSD2FoV2PUgJFwssb09KZhBNvUyRkKAYVqHJVolEthI9WcpqVYL6TVhsBRboR6qUGXFHzgHaUAHpa2sUL6R00L30koTEh',
          locale: 'auto',
          token: function (token: any) {
            console.log(token);
            alert('Payment via stripe successfull!');
          },
        });
      };

      window.document.body.appendChild(scr);
    }
  }
}

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
  count: any;
  strikeCheckout: any = null;
  paymentForm: FormGroup;
  error: string;
  selectedStatus: any;
  constructor(
    public dialogRef: MatDialogRef<CreateAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private billingService: BillingService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      paymentMethod: [],
    });
    this.stripePaymentGateway();
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

  checkout(amount: number) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      // key: 'pk_test_12239293949ksdfksdjkfj1232q3jkjssdfjk',
      key: 'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        // alert('Payment Successful!');
        this.snackBar.open('Payment Successful!', 'cancel');
      },
    });

    strikeCheckout.open({
      name: 'Online Payment',
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
          // key: 'pk_test_12239293949ksdfksdjkfj1232q3jkjssdfjk',
          key: 'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3',
          locale: 'auto',
          token: function (token: any) {
            console.log(token);
            // alert('Payment via stripe successfull!');
            this.snackBar.open('Payment Successful!', 'cancel');
          },
        });
      };

      window.document.body.appendChild(scr);
    }
    // this.pay();
  }

  check(value: any) {
    this.count = value;
  }
}

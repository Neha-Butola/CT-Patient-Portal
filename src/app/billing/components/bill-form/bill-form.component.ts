import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { combineLatest } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CreateAppointmentComponent } from 'src/app/appointment/schedule-appointment/modals/create-appointment/create-appointment.component';
import { AppointmentService } from 'src/app/appointment/services/appointment.service';
import { AuthService } from 'src/app/user/services/auth.service';
import { Billing } from '../../model/billing';
import { BillingService } from '../../service/billing.service';
import { PaymentMethodComponent } from '../payment-method/payment-method.component';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss'],
})
export class BillFormComponent implements OnInit {
  paymentForm: FormGroup;
  today = new Date();
  billForm: FormGroup;
  billing: Billing;
  isEdit: boolean = true;
  isLoading: boolean = true;
  errors: any = {};
  userData: any;
  appointments: any;
  physician: any[];
  strikeCheckout: any = null;
  error: string;
  // selectedStatus: any;

  constructor(
    private fb: FormBuilder,
    private billingService: BillingService,
    private authService: AuthService,
    private router: Router,
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar
  ) {}

  createForm(billing?: Billing) {
    this.billForm = this.fb.group({
      // id: new FormControl(billing?.id || '', [Validators.required]),
      appointment: new FormControl(billing?.appointment || '', [
        Validators.required,
      ]),
      consultationFee: new FormControl(billing?.consultationFee || '', [
        Validators.required,
      ]),
    });
  }

  // to get all appointment from api
  fetchData() {
    return this.appointmentService.getAppointments();
  }

  getControl(key: string): AbstractControl | null {
    return this.billForm.get(key);
  }
  appointmentChange(event: any) {
    console.log(this.billForm.value);
    this.physician = this.appointments.find(
      (a: any) => a.id === this.billForm.value.appointment
    )?.physician;
  }

  onSubmit() {
    if (this.billForm.valid) {
      if (this.billing) {
        this.billingService
          .updateBill(this.billForm.value, this.billing.id)
          .subscribe(
            (res: any) => {
              this.isEdit = false;
              // this.snackBar.open('Your data updated successfully.', 'cancel');
            },
            (err: any) => {
              console.log(JSON.stringify(err));
              this.errors = err.error;
            }
          );
      } else {
        const data = {
          ...this.billForm.value,
          userId: this.userData.id,
          id: '',
          physician: this.physician,
        };
        this.billingService.saveBill(data).subscribe(
          (res: any) => {
            this.billing = {
              ...data,
              id: res.id,
            };
            this.isEdit = false;
            // this.snackBar.open('Your data added successfully.', 'cancel');
          },
          (err: any) => {
            console.log(JSON.stringify(err));
            this.errors = err.error;
          }
        );
      }
    } else {
      this.billForm.markAsTouched();
    }
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    if (this.userData) {
      this.stripePaymentGateway();
      combineLatest([
        this.fetchData(),
        // this.billingService.getBilling(this.userData.id).pipe(
        //   finalize(() => {
        //     this.isLoading = false;
        //     if (!this.billForm) {
        //       this.createForm();
        //     }
        //   })
        // ),
      ]).subscribe(
        (res) => {
          this.isLoading = false;
          //this.billing = res[1];
          this.appointments = res[0];
          console.log(this.appointments);
          if (this.billing) {
            this.isEdit = false;
          }
          this.createForm(this.billing);
        },
        (err) => {
          // console.log("no data")
          this.createForm();
        }
      );
    }
  }

  pay() {
    this.billingService
      .updateBill(
        {
          ...this.billing,
          paymentMethod: 'Appointment',
          billingDate: new Date(),
        },
        this.billing.id
      )
      .subscribe(
        (res: any) => {
          this.router.navigate(['/billing']);
          this.snackBar.open('Payment Successful!', 'cancel');
        },
        (err: any) => {
          this.error = err.error;
        }
      );
  }
  checkout() {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JeLPZSD2FoV2PUgJFwssb09KZhBNvUyRkKAYVqHJVolEthI9WcpqVYL6TVhsBRboR6qUGXFHzgHaUAHpa2sUL6R00L30koTEh',
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log(stripeToken);
        this.pay();
      },
    });

    strikeCheckout.open({
      name: 'Online Payment',
      description: 'Payment widgets',

      amount: this.billForm.value.consultationFee,
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

  // openDialog() {
  //   this.dialogRef.open(PaymentMethodComponent, { data: this.billing });
  // }
}

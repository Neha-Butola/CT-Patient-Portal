import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { combineLatest } from 'rxjs';
import { finalize } from 'rxjs/operators';
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
  @Output() dataAmount = new EventEmitter<any>();
  today = new Date();
  billForm: FormGroup;
  billing: Billing;
  isEdit: boolean = true;
  isLoading: boolean = true;
  errors: any = {};
  userData: any;
  appointments: any;
  physician: any[];

  constructor(
    private fb: FormBuilder,
    private billingService: BillingService,
    private authService: AuthService,

    private appointmentService: AppointmentService,
    public dialogRef: MatDialog
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

  openDialog() {
    this.dialogRef.open(PaymentMethodComponent, { data: this.billing });
  }

  onClose(count: any) {
    this.dataAmount.emit();
  }
}

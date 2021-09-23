import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './components/billing/billing.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../material.module';
import { BillFormComponent } from './components/bill-form/bill-form.component';
import { PaymentComponent } from './components/payment/payment.component';

@NgModule({
  declarations: [BillingComponent, BillFormComponent, PaymentComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    MaterialModule,
    BillingRoutingModule,
  ],
})
export class BillingModule {}

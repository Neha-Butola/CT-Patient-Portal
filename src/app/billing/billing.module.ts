import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './components/billing/billing.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { BillFormComponent } from './components/bill-form/bill-form.component';

import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [BillingComponent, BillFormComponent, PaymentMethodComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPrintModule,

    MaterialModule,
    BillingRoutingModule,
  ],
})
export class BillingModule {}

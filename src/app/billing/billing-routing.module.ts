import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillFormComponent } from './components/bill-form/bill-form.component';
import { BillingComponent } from './components/billing/billing.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';

const routes: Routes = [
  {
    path: '',
    component: BillingComponent,
  },
  {
    path: 'billform',
    component: BillFormComponent,
  },
  {
    path: 'payment-method',
    component: PaymentMethodComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingRoutingModule {}

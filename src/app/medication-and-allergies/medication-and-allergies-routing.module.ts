import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicationDetailsComponent } from './components/medication-details/medication-details.component';
import { MedicationFormComponent } from './components/medication-form/medication-form.component';
import { MedicationHistoryComponent } from './components/medication-history/medication-history.component';

const routes: Routes = [
  {
    path: 'form',
    component: MedicationFormComponent,
  },
  {
    path: 'history',
    component: MedicationHistoryComponent,
  },
  {
    path: 'details/:id',
    component: MedicationDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicationAndAllergiesRoutingModule {}

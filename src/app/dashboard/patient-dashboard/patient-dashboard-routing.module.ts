import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: PatientDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientDashboardRoutingModule {}

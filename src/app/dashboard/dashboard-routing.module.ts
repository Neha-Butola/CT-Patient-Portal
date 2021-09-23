import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'patient-dashboard',
    loadChildren: () =>
      import('./patient-dashboard/patient-dashboard.module').then(
        (m) => m.PatientDashboardModule
      ),
  },
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

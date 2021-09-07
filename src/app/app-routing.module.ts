import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'demographics',
    loadChildren: () =>
      import('./demographics/demographics.module').then(
        (m) => m.DemographicsModule
      ),
  },
  {
    path: 'medication-and-allergies',
    loadChildren: () =>
      import('./medication-and-allergies/medication-and-allergies.module').then(
        (m) => m.MedicationAndAllergiesModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

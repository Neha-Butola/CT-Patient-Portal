import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
  },
  {
    path: 'medication-and-allergies',
    loadChildren: () =>
      import('./medication-and-allergies/medication-and-allergies.module').then(
        (m) => m.MedicationAndAllergiesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./appointment/appointment.module').then(
        (m) => m.AppointmentModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

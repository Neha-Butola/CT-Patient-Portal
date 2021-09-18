import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsHistoryComponent } from './appointments-history/appointments-history.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';

const routes: Routes = [
  {
    path: 'schedule-appointment',
    component: ScheduleAppointmentComponent,
  },
  {
    path: 'calender',
    component: AppointmentsHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentRoutingModule {}

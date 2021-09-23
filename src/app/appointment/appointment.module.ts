import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { MaterialModule } from '../material.module';
import { CreateAppointmentComponent } from './schedule-appointment/modals/create-appointment/create-appointment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteAppointmentComponent } from './schedule-appointment/modals/delete-appointment/delete-appointment.component';
import { AppointmentsHistoryComponent } from './appointments-history/appointments-history.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DatePipe } from '@angular/common';
FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
]);

@NgModule({
  declarations: [
    ScheduleAppointmentComponent,
    CreateAppointmentComponent,
    DeleteAppointmentComponent,
    AppointmentsHistoryComponent,
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
  providers: [DatePipe],
})
export class AppointmentModule {}

import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { Appointment } from '../schedule-appointment/model/appointment.model';
import { AppEvent } from '../schedule-appointment/model/event.model';
import { AppointmentService } from '../services/appointment.service';
@Component({
  selector: 'app-appointments-history',
  templateUrl: './appointments-history.component.html',
  styleUrls: ['./appointments-history.component.scss'],
})
export class AppointmentsHistoryComponent implements OnInit {
  // DI for appointment service
  constructor(private as: AppointmentService) {}
  appevents: AppEvent[] = [];
  appointments: Appointment[] = [];
  calendarOptions;
  //options for fullCalender
  init() {
    let calendarOptions: CalendarOptions = {
      initialView: 'dayGridMonth',
      events: this.appevents,
    };

    this.calendarOptions = calendarOptions;
  }

  ngOnInit(): void {
    this.as.getAppointments().subscribe(
      (app: Appointment[]) => {
        console.log('res', app);
        this.appointments = app;
        this.appointments.forEach((element) => {
          console.log(element);
          this.appevents.push({
            title: element.title,
            duration: 1,
            start: element.date,
          });
        });
        console.log(this.appevents);
        this.init();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

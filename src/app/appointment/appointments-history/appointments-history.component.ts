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
  app: Appointment[];
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
    let appevent: AppEvent = { title: '', duration: 1, start: new Date() };
    this.as.getAppointments().subscribe(
      (res) => {
        console.log(res);
        this.app = res;
        console.log('events are' + this.appevents);
        console.log('app are' + this.app);
        this.app.forEach((element, index) => {
          console.log(appevent);
          appevent.title = element.provider;
          appevent.duration = 1;
          appevent.start = element.date;
          console.log('loop ends');
          this.appevents.push(appevent);
        });
        console.log('events are again' + this.appevents);
        this.init();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

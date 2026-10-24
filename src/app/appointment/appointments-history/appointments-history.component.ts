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
    // get appointment data of user from api
    this.as.getAppointments().subscribe(
      (app: Appointment[]) => {
        this.appointments = app;
        // push each appointment to appevents array as a calender event
        this.appointments.forEach((element) => {
          if (element.status) {
            const time = this.convertTime12to24(element.slot); // convert 12 hr to 24 hr
            this.appevents.push({
              title: element.title,
              start: `${element.date}T${time}:00:00`,
              duration: '10:00',
            });
          }
        });
        console.log(this.appevents);
        this.init();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // to return 12hr format to 24 hr to dispaly in full calender
  convertTime12to24(time12h: any) {
    const [time, modifier] = time12h.split(' ');

    let hours = time;
    if (time === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return hours;
  }
}

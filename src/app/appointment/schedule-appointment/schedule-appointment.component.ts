import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAppointmentComponent } from './modals/create-appointment/create-appointment.component';
import { Appointment } from './model/appointment.model';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DeleteAppointmentComponent } from './modals/delete-appointment/delete-appointment.component';
import { AppointmentService } from '../services/appointment.service';
import { finalize, tap, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss'],
})
export class ScheduleAppointmentComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private appointmentService: AppointmentService
  ) {}
  appointments: Appointment[] = [];
  appointmentName: string[] = [];
  displayedColumns: string[] = [
    'title',
    'date',
    'physician',
    'slot',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<Appointment>(this.appointments);
  clickedRows = new Set<Appointment>();
  isData = false;
  @ViewChild(MatTable) table: MatTable<Appointment>;

  ngOnInit(): void {
    this.fetchData();
  }

  // to open book appointment dialog
  openDialog(): void {
    console.log(this.appointmentName);
    const dialogRef = this.dialog.open(CreateAppointmentComponent, {
      width: '400px',
      data: this.appointmentName,
    });

    // push data to table when dialog is closed
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.date = result.date;
        this.appointmentService
          .postAppointment(result)
          .pipe(
            tap(() => {
              this.appointments.push(result);
              this.isData = true;
              this.table.renderRows();
            })
          )
          .subscribe(
            (res) => {
              console.log(res);
            },
            (err) => {}
          );
      }
    });
  }

  // to open delete appointment dialog
  removeData(e: Appointment) {
    let index = this.appointments.indexOf(e);
    let id = e.id;
    const dialogRef = this.dialog.open(DeleteAppointmentComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // to delete appointment from table
        this.appointments.splice(index, 1);
        this.table.renderRows();

        // to delete appointment from api
        this.appointmentService
          .deleteAppointments(this.appointments[index], id)
          .subscribe((res) => {
            console.log('delete array');
            this.table.renderRows();
          });
      }
    });
  }

  // to get all appointment from api
  fetchData() {
    this.appointmentService
      .getAppointments()
      .pipe(
        finalize(() => {
          if (this.appointments.length > 0) {
            console.log('app titile');
            this.appointments.forEach((element) => {
              this.appointmentName.push(element.title);
              console.log(this.appointmentName);
            });
          }
        })
      )
      .subscribe(
        (res) => {
          console.log(res);
          res.forEach((ele) => {
            let month: any = new Date().getMonth() + 0o1;
            month = month < 10 ? `0${month}` : month;
            console.log(month);
            let date = `${new Date().getFullYear()}-${month}-${new Date().getDate()}`;
            if (ele.date > date) {
              this.isData = true;
              console.log(ele);
              this.appointments.push(ele);
            }
          });
          // if (res.length) {
          //   this.isData = true;
          // }
          this.table.renderRows();
        },
        (err) => {
          console.log('no data');
        }
      );
  }
}

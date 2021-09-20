import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAppointmentComponent } from './modals/create-appointment/create-appointment.component';
import { Appointment } from './model/appointment.model';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DeleteAppointmentComponent } from './modals/delete-appointment/delete-appointment.component';
import { AppointmentService } from '../services/appointment.service';

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
  data = Object.assign(this.appointments);
  displayedColumns: string[] = ['date', 'provider', 'slot', 'actions'];
  dataSource = new MatTableDataSource<Appointment>(this.appointments);
  clickedRows = new Set<Appointment>();
  isData = false;
  @ViewChild(MatTable) table: MatTable<Appointment>;

  ngOnInit(): void {
    this.fetchData();
  }

  // to open book appointment dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateAppointmentComponent, {
      width: '400px',
    });

    // push data to table when dialog is closed
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.appointmentService.postAppointment(result).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {}
        );
        this.appointments.push(result);
        this.isData = true;
        this.table.renderRows();
      }
    });
  }

  // to open delete appointment dialog
  removeData(e: Appointment) {
    console.log('remove arraya');
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
    this.appointmentService.getAppointments().subscribe(
      (res) => {
        if (res.length) {
          this.isData = true;
        }
        this.appointments = [...res];
        console.log(res);
        this.table.renderRows();
      },
      (err) => {
        console.log('no data');
      }
    );
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAppointmentComponent } from './modals/create-appointment/create-appointment.component';
import { Appointment } from './model/appointment.model';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DeleteAppointmentComponent } from './modals/delete-appointment/delete-appointment.component';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss'],
})
export class ScheduleAppointmentComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  appointments: Appointment[] = [];
  data = Object.assign(this.appointments);
  displayedColumns: string[] = ['date', 'provider', 'slot', 'actions'];
  dataSource = new MatTableDataSource<Appointment>(this.appointments);
  clickedRows = new Set<Appointment>();

  @ViewChild(MatTable) table: MatTable<Appointment>;
  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateAppointmentComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.appointments.push(result);
        this.table.renderRows();
      }
    });
  }

  remove(e: Appointment) {
    console.log('remove arraya');
    let index = this.appointments.indexOf(e);
    const dialogRef = this.dialog.open(DeleteAppointmentComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.appointments.splice(index, 1);
        this.table.renderRows();
      }
    });
  }
}

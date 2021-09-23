import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-appointment',
  templateUrl: './delete-appointment.component.html',
  styleUrls: ['./delete-appointment.component.scss'],
})
export class DeleteAppointmentComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteAppointmentComponent>) {}

  remove: boolean = false;

  ngOnInit(): void {}

  delete() {
    this.remove = true;
    this.dialogRef.close(this.remove);
  }

  cancel() {
    this.dialogRef.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss'],
})
export class CreateAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  providers = [
    { name: 'John', role: 'Neutrologist' },
    { name: 'Alex', role: 'Pediatrician' },
    { name: 'Alice', role: 'Orthodontist' },
  ];

  slots = ['10 - 11', '11-12', '1-2', '3-4', '4-5'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateAppointmentComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      provider: ['', Validators.required],
      slot: ['', Validators.required],
    });
  }

  createAppointment() {
    this.dialogRef.close(this.appointmentForm.value);
  }
}

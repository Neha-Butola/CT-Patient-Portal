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
  maxDate: any;
  minDate: any;
  providers = [
    { name: 'John', role: 'Neutrologist' },
    { name: 'Alex', role: 'Pediatrician' },
    { name: 'Alice', role: 'Orthodontist' },
  ];

  slots = ['10 - 11 am', '11-12 am', '1-2 pm', '3-4 pm', '4-5 pm'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateAppointmentComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setDOBVal();
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

  setDOBVal() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 1 / 365);
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() + 1 / 365);
  }
}

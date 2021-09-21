import { KeyValue, KeyValuePipe } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { AppointmentService } from 'src/app/appointment/services/appointment.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss'],
  providers: [KeyValuePipe],
})
export class CreateAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  maxDate: any;
  minDate: any;
  medications: any[] = [];
  physicians: any[];

  slots = ['10 - 11 am', '11-12 am', '1-2 pm', '3-4 pm', '4-5 pm'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateAppointmentComponent>,
    public apService: AppointmentService,
    private keyValue: KeyValuePipe
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setDOBVal();
    this.getMedication();
  }

  // appointment form bulider
  initForm() {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      physician: ['', Validators.required],
      slot: ['', Validators.required],
    });
  }

  // to return form control
  get f() {
    return this.appointmentForm.controls;
  }

  // to close the dialog and pass the value of appointment form
  createAppointment() {
    this.dialogRef.close(this.appointmentForm.value);
  }

  // for date of birth validations
  setDOBVal() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 1 / 365);
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() + 1 / 365);
  }
  // subscribe to  medicationlist function in appointment service to get medication.
  getMedication() {
    this.apService.getMedicationList().subscribe((res) => {
      console.log(res);
      let values: any[] = [];
      res.forEach((element) => {
        let value = {};
        value['title'] = element.currentmedication;
        this.medications.push(value);
      });
      return values;
    });
  }

  // get all physician related to the selected medication
  getPhysician(e: any) {
    this.physicians = [];
    this.apService.getPhysicianList(e.value).subscribe((res) => {
      console.log(res);
      res.forEach((element) => {
        this.physicians.push(element);
      });
      console.log(this.physicians);
    });
  }
}

import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/appointment/services/appointment.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss'],
})
export class CreateAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  maxDate: any;
  minDate: any;
  medications: any[] = [];
  physicians: any[];

  slots = ['10 AM', '11 PM', '1 PM', '4 PM', '5 PM'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [],
    public apService: AppointmentService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setDateValidation();
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
    this.appointmentForm.value.date = this.datePipe.transform(
      this.appointmentForm.value.date,
      'yyyy-MM-dd'
    );
    this.dialogRef.close(this.appointmentForm.value);
  }

  // for date of birth validations
  setDateValidation() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
    this.minDate = new Date();
  }
  // subscribe to  medicationlist function in appointment service to get medication.
  getMedication() {
    this.apService.getMedicationList().subscribe((res) => {
      console.log(res);
      let values: any[] = [];

      console.log(this.data);
      res.forEach((element) => {
        let value = {};
        value['title'] = element.currentmedication;
        value['exist'] = false;
        this.data.forEach((el) => {
          if (value['title'] == el) {
            value['exist'] = true;
          }
        });
        this.medications.push(value);
      });
      console.log(this.medications);
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

  cancel() {
    this.dialogRef.close();
  }
}

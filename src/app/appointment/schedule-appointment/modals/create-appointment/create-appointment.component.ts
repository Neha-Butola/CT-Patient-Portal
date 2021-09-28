import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/appointment/services/appointment.service';
import { AuthService } from 'src/app/user/services/auth.service';
import { Appointment } from '../../model/appointment.model';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss'],
})
export class CreateAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  treatmentForm: FormGroup;
  maxDate: any;
  minDate: any;
  user_role: string;
  medication: string;
  physicians: any[] = [];
  providers: any[];
  slots = ['10 AM', '11 PM', '1 PM', '4 PM', '5 PM'];
  treatments = [
    'common body illnesses',
    'cardiovascular conditions',
    'injuries of internal organ systems',
    'mental, emotional, and behavioral disorders',
  ];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public apService: AppointmentService,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.user_role = this.authService.userData.role;
    }
    if (this.user_role == 'Patient') {
      this.getPhysician();
    } else if (this.user_role == 'Physician') {
      this.setTreatment();
    }
    this.initForm();
    this.setDateValidation();
  }

  // appointment form bulider
  initForm() {
    this.appointmentForm = this.fb.group({
      title: [this.medication, Validators.required],
      date: ['', Validators.required],
      provider: ['', Validators.required],
      slot: ['', Validators.required],
    });
    this.treatmentForm = this.fb.group({
      name: ['', Validators.required],
      physician: ['', Validators.required],
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
  setTreatment() {
    this.medication = this.data.name;
    this.getProviders(this.medication);
  }

  // get all physician related to the selected medication
  getProviders(name) {
    this.providers = [];
    this.apService.getProvidersList(name).subscribe((res) => {
      console.log(res);
      res.forEach((element) => {
        console.log(element);
        this.providers.push(element.name);
      });
    });
  }

  getPhysician() {
    this.apService.getPhysicianList().subscribe((res) => {
      res.forEach((elm) => {
        if (elm.role == 'Physician') {
          let physician = `${elm.firstName} ${elm.lastName}`;
          console.log('physician');
          console.log(physician);
          this.physicians.push(physician);
        }
      });
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  SubmitTreatment() {
    this.apService.postTreatment(this.treatmentForm.value).subscribe((res) => {
      console.log(res);
    });
  }
}

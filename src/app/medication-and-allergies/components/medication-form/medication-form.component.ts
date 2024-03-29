import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicationFormDetails } from '../../model/medication-form-details';
import { FetchpostService } from '../../services/fetchpost.service';

@Component({
  selector: 'app-medication-form',
  templateUrl: './medication-form.component.html',
  styleUrls: ['./medication-form.component.scss'],
})
export class MedicationFormComponent implements OnInit {
  // medication: MedicationFormDetails = {
  //   currentmedication: '',
  //   otcmedication: '',
  //   herbsmineralandvitamin: '',
  //   socialdrug: '',
  //   pastprescribedmedication: '',
  // };
  medication: any = {};
  errors: any = {};
  constructor(
    private router: Router,
    private fetchpostservice: FetchpostService
  ) {}
  //To create medication & allergiea data set

  medicationForm() {
    alert('hoo');
    this.fetchpostservice
      .createMedicationAndAllergies(this.medication)
      .subscribe(
        (res: any) => {
          console.log(JSON.stringify(res), 'medicationform');
        }
        // (err) => {}
      );
  }

  ngOnInit(): void {}
}

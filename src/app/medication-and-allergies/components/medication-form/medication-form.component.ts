import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchpostService } from '../../services/fetchpost.service';

@Component({
  selector: 'app-medication-form',
  templateUrl: './medication-form.component.html',
  styleUrls: ['./medication-form.component.scss'],
})
export class MedicationFormComponent implements OnInit {
  medication: any = {};
  constructor(
    private router: Router,
    private fetchpostservice: FetchpostService
  ) {}
  medicationForm() {
    this.fetchpostservice
      .createMedicationAndAllergies(this.medication)
      .subscribe(
        (res) => {
          console.log(JSON.stringify(res), 'medicationform');
        },
        (err) => {}
      );
  }

  ngOnInit(): void {}
}

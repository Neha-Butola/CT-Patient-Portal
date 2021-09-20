import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchpostService } from '../../services/fetchpost.service';

@Component({
  selector: 'app-medication-details',
  templateUrl: './medication-details.component.html',
  styleUrls: ['./medication-details.component.scss'],
})
export class MedicationDetailsComponent implements OnInit {
  viewMedicationData: any;
  constructor(
    private router: Router,
    private fetchpostservice: FetchpostService
  ) {}

  ngOnInit(): void {
    this.fetchpostservice.viewMedicationData(6).subscribe(
      (response) => {
        console.log(response);
        this.viewMedicationData = response;
      },
      (err) => {}
    );
  }
}

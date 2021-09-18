import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchpostService } from '../../services/fetchpost.service';

@Component({
  selector: 'app-medication-history',
  templateUrl: './medication-history.component.html',
  styleUrls: ['./medication-history.component.scss'],
})
export class MedicationHistoryComponent implements OnInit {
  medicationDetails: any;
  constructor(
    private router: Router,
    private fetchpostservice: FetchpostService
  ) {}

  ngOnInit(): void {
    this.fetchpostservice.getMedicationData().subscribe(
      (res) => {
        console.log(res);
        this.medicationDetails = res;
      },

    (err) => {}
    );
  }
}

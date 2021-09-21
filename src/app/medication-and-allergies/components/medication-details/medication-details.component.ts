import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchpostService } from '../../services/fetchpost.service';

@Component({
  selector: 'app-medication-details',
  templateUrl: './medication-details.component.html',
  styleUrls: ['./medication-details.component.scss'],
})
export class MedicationDetailsComponent implements OnInit {
  viewMedicationData: any;
  id: any;
  constructor(
    private router: Router,
    private fetchpostservice: FetchpostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchpostservice.viewMedicationData(this.id).subscribe(
      (response) => {
        console.log(response);
        this.viewMedicationData = response;
      },
      (err) => {}
    );
  }
}

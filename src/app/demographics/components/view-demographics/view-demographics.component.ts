import { Component, OnInit } from '@angular/core';
import { Demographics } from '../../model/demographics';
import { DemographicsService } from '../../services/demographics.service';

@Component({
  selector: 'app-view-demographics',
  templateUrl: './view-demographics.component.html',
  styleUrls: ['./view-demographics.component.scss'],
})
export class ViewDemographicsComponent implements OnInit {
  constructor(private demo: DemographicsService) {}

  columns: string[] = [
    'First Name',
    'Last Name',
    'Gender',
    'Ethnicity',
    'Education',
    'Occupation',
    'Address',
    'Phone',
    'Medical',
    'Family Medical',
    'Surgeries',
    'Insurance',
    'Id',
  ];

  index = [
    'firstname',
    'lastname',
    'gender',
    'ethnicity',
    'education',
    'occupation',
    'address',
    'phone',
    'medical',
    'familymedical',
    'surgeries',
    'insurance',
    'id',
  ];

  viewdemo: Demographics[] = [];

  ngOnInit(): void {
    this.demo.getDemography().subscribe(
      (res) => {
        this.viewdemo = [...res];
        console.log(res);
      },
      (error) => {
        console.log('error' + error);
      }
    );
  }
}

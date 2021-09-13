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
    'Id',
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
  ];

  index = [
    'id',
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
  ];

  viewdemo: Demographics[] = [];
  // viewdemo: any[] = [];

  ngOnInit(): void {
    this.demo.getDemographicList().subscribe(
      (res) => {
        this.viewdemo = [...res];
        console.log(res);
      },
      (error) => {
        console.log('error' + error);
      }
    );
  }

  // editData() {
  //   this.demo.putDemography(this.viewdemo).subscribe((res) => {
  //     console.log(res);
  //   });
  // }
}

import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { ImmDetailsService } from '../../services/imm-details.service';
import { Immunization } from '../../model/immunization';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-imm-details',
  templateUrl: './imm-details.component.html',
  styleUrls: ['./imm-details.component.scss'],
})
export class ImmDetailsComponent implements OnInit {
  myDate: Date = new Date();
  constructor(private demo: ImmDetailsService) {}
  columns: string[] = [
    'Id',
    'Vaccine Name',
    'Dose1',
    'Date1',
    'Doses2',
    'Date2',
  ];

  index = ['id', 'vaccinename', 'doses1', 'date', 'doses2', 'date1'];
  other: string[] = ['Current Date', 'Vaccine Type'];

  otherindex = ['vaccinetype'];
  viewdemo: Immunization[] = [];
  viewotherdemo: Immunization[] = [];
  // viewdemo: any[] = [];
  state: boolean = false;

  isAllowed = (id) => {
    return id < 5 ? true : this.state;
  };
  changeState = () => {
    this.state = !this.state;
  };

  ngOnInit(): void {
    this.demo.getImmunizationList().subscribe(
      (res) => {
        this.viewdemo = [...res];
      },
      (error) => {
        console.log('error' + error);
      }
    );
    this.demo.getotherList().subscribe(
      (data) => {
        this.viewotherdemo = [...data];
      },
      (error) => {
        console.log('error' + error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchuserdataService } from '../../services/fetchuserdata.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  usersDetails: any;
  constructor(
    private router: Router,
    private fetchusersdataservice: FetchuserdataService
  ) {}

  ngOnInit(): void {
    this.getAllUsersData();
  }
  getAllUsersData() {
    this.fetchusersdataservice.getUsersData().subscribe(
      (res) => {
        console.log(JSON.stringify(res));
        this.usersDetails = res;
        console.log(res, 'get users');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  toggleEditable(event) {
    this.fetchusersdataservice.getUsersData().subscribe(
      (res) => {
        console.log(JSON.stringify(res));
        this.usersDetails = res;
        console.log(res, 'get users');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

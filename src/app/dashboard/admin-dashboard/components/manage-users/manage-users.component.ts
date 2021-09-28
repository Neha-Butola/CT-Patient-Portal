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

  ngOnInit(): void {}
  getAllUsersData() {
    this.fetchusersdataservice.getUsersData().subscribe(
      (res) => {
        console.log(JSON.stringify(res));
        this.usersDetails = JSON.stringify(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

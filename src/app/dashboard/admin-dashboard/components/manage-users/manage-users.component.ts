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
  statusof: any;

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
  toggleEditable(event, u: any) {
    this.statusof = u;

    if (event.target.checked == false) {
      this.statusof.status = 'In Active';
    }
    if (event.target.checked == true) {
      this.statusof.status = 'Active';
    }
    console.log(this.statusof.id);

    this.fetchusersdataservice
      .changeUserStatus(this.statusof.id, this.statusof)
      .subscribe(
        (res) => {
          console.log(event.target.checked, 'stat');
          if (event.target.checked == false) {
            this.statusof.status = 'In Active';
          } else {
            this.statusof.status = 'Active';
          }
        },
        (err) => {}
      );
  }
}

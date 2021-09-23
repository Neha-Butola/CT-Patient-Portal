import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterData } from '../user/model/auth.model';

import { AuthService } from '../user/services/auth.service';

@Component({
  selector: 'app-main-application',
  templateUrl: './main-application.component.html',
  styleUrls: ['./main-application.component.scss'],
})
export class MainApplicationComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  constructor(private authService: AuthService, private router: Router) {}
  user: any;
  ngOnInit(): void {}

  ngDoCheck(): void {
    this.authService.checkStorage();
    // if user is logged in then get user data

    if (this.authService.isLoggedIn()) {
      this.isAuthenticated = true;
      this.user = this.authService.userData;
    }
  }

  // to logout the user from the portal
  logOut() {
    this.authService.logout();
    if (this.authService.userData == null) {
      this.router.navigate(['/']);
      this.isAuthenticated = false;
    }
  }

  ngOnDestroy() {}
}

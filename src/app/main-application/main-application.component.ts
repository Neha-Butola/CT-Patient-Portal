import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../user/services/auth.service';

@Component({
  selector: 'app-main-application',
  templateUrl: './main-application.component.html',
  styleUrls: ['./main-application.component.scss'],
})
export class MainApplicationComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  constructor(private authService: AuthService, private router: Router) {}
  user_name: string;
  ngOnInit(): void {}

  ngDoCheck(): void {
    this.authService.checkStorage();
    if (this.authService.isLoggedIn()) {
      this.isAuthenticated = true;
      this.user_name = this.authService.userData.email;
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

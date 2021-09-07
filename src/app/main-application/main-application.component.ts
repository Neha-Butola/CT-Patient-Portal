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

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.authService.checkStorage();
    if (this.authService.isLoggedIn()) {
      this.isAuthenticated = true;
    }
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.isAuthenticated = false;
  }

  ngOnDestroy() {}
}

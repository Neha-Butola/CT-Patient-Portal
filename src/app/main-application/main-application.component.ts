import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
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
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
    private authService: AuthService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  user: any;
  isopened = true;
  ngOnInit(): void {}

  ngDoCheck(): void {
    this.authService.checkStorage();

    // if user is logged in then get user data
    console.log(this.authService.isLoggedIn());

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

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

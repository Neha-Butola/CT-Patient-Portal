import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../user/services/auth.service';

@Component({
  selector: 'app-main-application',
  templateUrl: './main-application.component.html',
  styleUrls: ['./main-application.component.scss'],
})
export class MainApplicationComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private useSub: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log('user is');
    this.useSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log('user is ' + this.isAuthenticated);
      console.log('user is ' + this.isAuthenticated);
    });
  }

  ngOnDestroy() {
    this.useSub.unsubscribe();
  }
}

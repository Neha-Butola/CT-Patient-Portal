import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  ngDoCheck(): void {
    // if user is logged in then get user data
    if (this.authService.isLoggedIn()) {
      this.profile = this.authService.userData;
    }
  }
}

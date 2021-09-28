import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  constructor(private authService: AuthService) {}
  user: any;
  isPhysician = false;
  isAdmin = false;
  isPatient = false;

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.user = this.authService.userData;
      if (this.user.role == 'Physician') {
        this.isPhysician = true;
      } else if (this.user.role == 'Admin') {
        this.isAdmin = true;
      } else if (this.user.role == 'Patient') {
        this.isPatient = true;
      }
    }
  }
  onClose() {
    this.closeSidenav.emit();
  }
}

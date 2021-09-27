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

  ngOnInit(): void {
    this.user = this.authService.userData;
  }
  onClose() {
    this.closeSidenav.emit();
  }
}

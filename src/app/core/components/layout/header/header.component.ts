import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  @Input() username: string;
  isOpened = false;
  user: any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.userData;
  }

  onToggleSidenav() {
    this.isOpened = false;
    this.sidenavToggle.emit();
  }

  onLogOut() {
    this.logout.emit();
  }
}

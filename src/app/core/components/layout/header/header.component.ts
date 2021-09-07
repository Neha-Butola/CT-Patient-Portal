import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  isOpened = false;
  constructor() {}

  ngOnInit(): void {}

  onToggleSidenav() {
    this.isOpened = false;
    this.sidenavToggle.emit();
  }

  onLogOut() {
    this.logout.emit();
  }
}

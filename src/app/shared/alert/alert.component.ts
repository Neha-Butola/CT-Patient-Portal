import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  constructor() {}
  @Input() message: string;
  @Input() isError: boolean = false;
  @Input() isSuccess: boolean = false;
  @Output() close = new EventEmitter<void>();

  ngOnInit() {}

  onClose() {
    this.close.emit();
  }
}

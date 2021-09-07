import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`,
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

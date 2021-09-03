import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    this.router.navigate(['/dashboard/patient-dashboard']);
  }
}

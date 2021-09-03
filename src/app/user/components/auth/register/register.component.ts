import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private authServive: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form);
    this.authServive.createUser(form.value).subscribe((res) => {
      console.log('user has been added');
      console.log(JSON.stringify(res));
    });
  }
}

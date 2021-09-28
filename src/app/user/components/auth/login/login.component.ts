import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EmailValidator, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false; // to show/hide loader
  error: string = '';
  hide = true;
  user: any;

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    public cfResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  // submit Login data and set the token
  onSubmit(form: NgForm) {
    this.isLoading = true; // show the loader after registrion form submit
    let userData = { email: form.value.email, password: form.value.password };
    // to check if user and password correct
    this.authService.checkUser(userData).subscribe(
      (res) => {
        //to get the logged in useer data
        this.authService.login().subscribe((res) => {
          console.log('result is' + res);
          let users = res;
          users.forEach((element) => {
            if (userData.email == element.email) {
              this.user = element;
              console.log(this.user);
              //console.log(this.user.role);
              this.authService.setStorage(this.user);
            }
          });
          //this.router.navigate(['/dashboard/patient-dashboard']);
          //this.isLoading = false; //hide the loader after request happens
          if (this.user.role == 'Patient') {
            this.router.navigate(['/dashboard/patient-dashboard']);
            this.isLoading = false; //hide the loader after request happens
          } else if (this.user.role == 'Admin') {
            this.router.navigate(['/dashboard/admin-dashboard']);
            this.isLoading = false; //hide the loader after request happens
          } else {
            this.router.navigate(['/dashboard/physician-dashboard']);
            this.isLoading = false;
            //this.router.navigate(['/dashboard/patient-dashboard']);
            //this.isLoading = false; //hide the loader after request happens
          }
        });
      },
      (err) => {
        console.log(err);
        this.showAlert(err.error);
        this.isLoading = false; //hide the loader after request fails
      }
    );
  }

  private showAlert(message: string) {
    const alertCmpFactory = this.cfResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContRef = this.alertHost.viewContainerRef;
    hostViewContRef.clear();

    const compRef = hostViewContRef.createComponent(alertCmpFactory);

    compRef.instance.message = message;
    compRef.instance.isError = true;
    this.closeSub = compRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContRef.clear();
    });

    // setInterval(() => {
    //   hostViewContRef.clear();
    // }, 10000);
  }
}

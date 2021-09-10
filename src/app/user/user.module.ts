import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LoadingSpinnerComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [LoginComponent, RegisterComponent],
})
export class UserModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemographicsRoutingModule } from './demographics-routing.module';
import { DemographicsComponent } from './components/demographics/demographics.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { DemographicsService } from './services/demographics.service';
import { ViewDemographicsComponent } from './components/view-demographics/view-demographics.component';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [DemographicsComponent, ViewDemographicsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    DemographicsRoutingModule,
  ],
  // providers: [DemographicsService],
})
export class DemographicsModule {}

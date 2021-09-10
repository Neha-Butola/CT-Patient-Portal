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
@NgModule({
  declarations: [DemographicsComponent, ViewDemographicsComponent],
  imports: [
    CommonModule,
    DemographicsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
  ],
  providers: [DemographicsService],
})
export class DemographicsModule {}

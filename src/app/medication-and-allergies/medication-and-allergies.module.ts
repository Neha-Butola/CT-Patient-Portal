import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MedicationAndAllergiesRoutingModule } from './medication-and-allergies-routing.module';
import { MedicationFormComponent } from './components/medication-form/medication-form.component';
import { MedicationHistoryComponent } from './components/medication-history/medication-history.component';
import { MedicationDetailsComponent } from './components/medication-details/medication-details.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    MedicationFormComponent,
    MedicationHistoryComponent,
    MedicationDetailsComponent,
  ],
  imports: [
    CommonModule,
    MedicationAndAllergiesRoutingModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MaterialModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class MedicationAndAllergiesModule {}

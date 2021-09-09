import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MedicationAndAllergiesRoutingModule } from './medication-and-allergies-routing.module';
import { MedicationFormComponent } from './components/medication-form/medication-form.component';
import { MedicationHistoryComponent } from './components/medication-history/medication-history.component';
import { MedicationDetailsComponent } from './components/medication-details/medication-details.component';
import { HttpClientModule } from '@angular/common/http';

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
    MaterialModule,
  ],
})
export class MedicationAndAllergiesModule {}

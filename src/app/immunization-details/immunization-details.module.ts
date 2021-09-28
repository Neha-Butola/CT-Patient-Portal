import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImmunizationDetailsRoutingModule } from './immunization-details-routing.module';
import { ImmDetailsComponent } from './components/imm-details/imm-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { ImmunizationOtherVaccineComponent } from './components/immunization-other-vaccine/immunization-other-vaccine.component';
import { ImmunizationCovidComponent } from './components/immunization-covid/immunization-covid.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    ImmDetailsComponent,
    ImmunizationOtherVaccineComponent,
    ImmunizationCovidComponent,
  ],
  imports: [
    CommonModule,
    ImmunizationDetailsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MaterialModule,
    MatTableModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ImmunizationDetailsModule {}

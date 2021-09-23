import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ImmunizationDetailsRoutingModule } from './immunization-details-routing.module';
import { ImmDetailsComponent } from './components/imm-details/imm-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [ImmDetailsComponent],
  imports: [
    CommonModule,
    ImmunizationDetailsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ImmunizationDetailsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImmunizationDetailsRoutingModule } from './immunization-details-routing.module';

import { ImmunizationDetailsComponent } from './components/immunization-details/immunization-details.component';

@NgModule({
  declarations: [ImmunizationDetailsComponent],
  imports: [CommonModule, ImmunizationDetailsRoutingModule],
})
export class ImmunizationDetailsModule {}

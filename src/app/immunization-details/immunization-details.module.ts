import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImmunizationDetailsRoutingModule } from './immunization-details-routing.module';
import { ImmDetailsComponent } from './components/imm-details/imm-details.component';


@NgModule({
  declarations: [
    ImmDetailsComponent
  ],
  imports: [
    CommonModule,
    ImmunizationDetailsRoutingModule
  ]
})
export class ImmunizationDetailsModule { }

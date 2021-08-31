import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemographicsRoutingModule } from './demographics-routing.module';
import { DemographicsComponent } from './components/demographics/demographics.component';


@NgModule({
  declarations: [
    DemographicsComponent
  ],
  imports: [
    CommonModule,
    DemographicsRoutingModule
  ]
})
export class DemographicsModule { }

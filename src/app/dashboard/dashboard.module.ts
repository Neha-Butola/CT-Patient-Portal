import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, DashboardRoutingModule],
})
export class DashboardModule {}

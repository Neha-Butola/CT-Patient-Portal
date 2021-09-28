import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { PhysicianDashboardRoutingModule } from './physician-dashboard-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { PhysicianDashboardComponent } from './components/physician-dashboard/physician-dashboard.component';

@NgModule({
  declarations: [PhysicianDashboardComponent],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    PhysicianDashboardRoutingModule,
  ],
})
export class PhysicianDashboardModule {}

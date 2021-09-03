import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [PatientDashboardComponent, PatientProfileComponent],
  imports: [CommonModule, CoreModule],
})
export class PatientDashboardModule {}

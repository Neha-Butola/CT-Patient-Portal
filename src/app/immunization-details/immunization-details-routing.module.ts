import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImmDetailsComponent } from './components/imm-details/imm-details.component';
import { ImmunizationCovidComponent } from './components/immunization-covid/immunization-covid.component';
import { ImmunizationOtherVaccineComponent } from './components/immunization-other-vaccine/immunization-other-vaccine.component';

const routes: Routes = [
  {
    path: '',
    component: ImmDetailsComponent,
  },

  {
    path: 'immunization-covid',
    component: ImmunizationCovidComponent,
    pathMatch: 'full',
  },
  {
    path: 'immunization-other-vaccine',
    component: ImmunizationOtherVaccineComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImmunizationDetailsRoutingModule {}

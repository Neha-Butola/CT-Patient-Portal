import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImmunizationDetailsComponent } from './components/immunization-details/immunization-details.component';

const routes: Routes = [
  {
    path: '',
    component: ImmunizationDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImmunizationDetailsRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemographicsComponent } from './components/demographics/demographics.component';
import { ViewDemographicsComponent } from './components/view-demographics/view-demographics.component';

const routes: Routes = [
  {
    path: '',
    component: DemographicsComponent,
  },
  {
    path: 'view',
    component: ViewDemographicsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemographicsRoutingModule {}

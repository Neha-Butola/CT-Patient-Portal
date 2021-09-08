import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemographicsComponent } from './components/demographics/demographics.component';

const routes: Routes = [
  {
    path: '',
    component: DemographicsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemographicsRoutingModule {}

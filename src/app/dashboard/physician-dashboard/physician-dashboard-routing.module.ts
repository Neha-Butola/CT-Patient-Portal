import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhysicianDashboardComponent } from './components/physician-dashboard/physician-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: PhysicianDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicianDashboardRoutingModule {}

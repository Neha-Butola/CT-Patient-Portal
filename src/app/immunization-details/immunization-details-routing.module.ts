import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImmDetailsComponent } from './components/imm-details/imm-details.component';

const routes: Routes = [
  {
    path: '',
    component: ImmDetailsComponent,
  },
  {
    path: 'immunization',
    component: ImmDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImmunizationDetailsRoutingModule {}

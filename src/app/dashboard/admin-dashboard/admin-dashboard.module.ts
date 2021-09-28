import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/material.module';
import { UsersComponent } from './components/users/users.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';

@NgModule({
  declarations: [AdminDashboardComponent, UsersComponent, ManageUsersComponent],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    AdminDashboardRoutingModule,
  ],
})
export class AdminDashboardModule {}

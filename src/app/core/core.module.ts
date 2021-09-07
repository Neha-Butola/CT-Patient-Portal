import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/layout/header/header.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
@NgModule({
  declarations: [HeaderComponent, SidebarComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [HeaderComponent, SidebarComponent],
})
export class CoreModule {}

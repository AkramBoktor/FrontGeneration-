
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputerMaintenanceRoutingModule } from './computer-maintenance.routing.module';
import { ComputerMaintenanceComponent } from './computer-maintenance.component';

@NgModule({
  declarations: [ComputerMaintenanceComponent],
  imports: [
    ComputerMaintenanceRoutingModule,
    CommonModule,
  ]
})
export class ComputerMaintenanceModule { }


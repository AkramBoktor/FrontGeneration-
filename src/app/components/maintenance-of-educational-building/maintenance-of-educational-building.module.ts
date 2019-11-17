
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceOfEducationalBuildingRoutingModule } from './maintenance-of-educational-building.routing.module';
import { MaintenanceOfEducationalBuildingComponent } from './maintenance-of-educational-building.component';

@NgModule({
  declarations: [MaintenanceOfEducationalBuildingComponent],
  imports: [
    MaintenanceOfEducationalBuildingRoutingModule,
    CommonModule,
  ]
})
export class MaintenanceOfEducationalBuildingModule { }


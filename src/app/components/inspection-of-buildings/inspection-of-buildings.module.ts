
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionOfBuildingsRoutingModule } from './inspection-of-buildings.routing.module';
import { InspectionOfBuildingsComponent } from './inspection-of-buildings.component';

@NgModule({
  declarations: [InspectionOfBuildingsComponent],
  imports: [
    InspectionOfBuildingsRoutingModule,
    CommonModule,
  ]
})
export class InspectionOfBuildingsModule { }


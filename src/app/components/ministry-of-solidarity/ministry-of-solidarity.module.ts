
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinistryOfSolidarityRoutingModule } from './ministry-of-solidarity.routing.module';
import { MinistryOfSolidarityComponent } from './ministry-of-solidarity.component';

@NgModule({
  declarations: [MinistryOfSolidarityComponent],
  imports: [
    MinistryOfSolidarityRoutingModule,
    CommonModule,
  ]
})
export class MinistryOfSolidarityModule { }


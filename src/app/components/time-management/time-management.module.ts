
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeManagementRoutingModule } from './time-management.routing.module';
import { TimeManagementComponent } from './time-management.component';

@NgModule({
  declarations: [TimeManagementComponent],
  imports: [
    TimeManagementRoutingModule,
    CommonModule,
  ]
})
export class TimeManagementModule { }



    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeControlRoutingModule } from './time-control.routing.module';
import { TimeControlComponent } from './time-control.component';

@NgModule({
  declarations: [TimeControlComponent],
  imports: [
    TimeControlRoutingModule,
    CommonModule,
  ]
})
export class TimeControlModule { }


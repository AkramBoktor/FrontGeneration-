
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningAndFollowupRoutingModule } from './planning-and-followup.routing.module';
import { PlanningAndFollowupComponent } from './planning-and-followup.component';

@NgModule({
  declarations: [PlanningAndFollowupComponent],
  imports: [
    PlanningAndFollowupRoutingModule,
    CommonModule,
  ]
})
export class PlanningAndFollowupModule { }


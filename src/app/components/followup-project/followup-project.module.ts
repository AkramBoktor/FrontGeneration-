
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowupProjectRoutingModule } from './followup-project.routing.module';
import { FollowupProjectComponent } from './followup-project.component';

@NgModule({
  declarations: [FollowupProjectComponent],
  imports: [
    FollowupProjectRoutingModule,
    CommonModule,
  ]
})
export class FollowupProjectModule { }


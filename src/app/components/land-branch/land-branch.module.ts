
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandBranchRoutingModule } from './land-branch.routing.module';
import { LandBranchComponent } from './land-branch.component';

@NgModule({
  declarations: [LandBranchComponent],
  imports: [
    LandBranchRoutingModule,
    CommonModule,
  ]
})
export class LandBranchModule { }


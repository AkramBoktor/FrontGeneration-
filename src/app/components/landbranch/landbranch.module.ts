
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandBranchRoutingModule } from './landbranch.routing.module';
import { LandBranchComponent } from './landbranch.component';

@NgModule({
  declarations: [LandBranchComponent],
  imports: [
    LandBranchRoutingModule,
    CommonModule,
  ]
})
export class LandBranchModule { }


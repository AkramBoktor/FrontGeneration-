import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandsBranchesRoutingModule } from './lands-branches.routing.module';
import { LandsBranchesComponent } from './lands-branches.component';
@NgModule({
  declarations: [LandsBranchesComponent],
  imports: [
    LandsBranchesRoutingModule,
    CommonModule
  ]
})
export class LandsBranchesModule { }

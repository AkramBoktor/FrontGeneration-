
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolBranchesMapRoutingModule } from './school-branches-map.routing.module';
import { SchoolBranchesMapComponent } from './school-branches-map.component';

@NgModule({
  declarations: [SchoolBranchesMapComponent],
  imports: [
    SchoolBranchesMapRoutingModule,
    CommonModule,
  ]
})
export class SchoolBranchesMapModule { }


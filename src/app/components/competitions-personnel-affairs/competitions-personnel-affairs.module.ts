
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionsPersonnelAffairsRoutingModule } from './competitions-personnel-affairs.routing.module';
import { CompetitionsPersonnelAffairsComponent } from './competitions-personnel-affairs.component';

@NgModule({
  declarations: [CompetitionsPersonnelAffairsComponent],
  imports: [
    CompetitionsPersonnelAffairsRoutingModule,
    CommonModule,
  ]
})
export class CompetitionsPersonnelAffairsModule { }


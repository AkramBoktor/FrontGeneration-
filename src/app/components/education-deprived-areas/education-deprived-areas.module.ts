
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationDeprivedAreasRoutingModule } from './education-deprived-areas.routing.module';
import { EducationDeprivedAreasComponent } from './education-deprived-areas.component';

@NgModule({
  declarations: [EducationDeprivedAreasComponent],
  imports: [
    EducationDeprivedAreasRoutingModule,
    CommonModule,
  ]
})
export class EducationDeprivedAreasModule { }

